<?php

namespace Bolt\Extension\YourName\ExtensionName;

use Bolt\Application;
use Bolt\BaseExtension;
use Bolt\Events\StorageEvent;
use Bolt\Events\StorageEvents;
use Bolt\Extension\YourName\ExtensionName\Controller\ExampleController;
use Bolt\Extension\YourName\ExtensionName\Listener\StorageEventListener;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class Extension extends BaseExtension
{
    /**
     * The extension name
     *
     * @return string
     */
    public function getName()
    {
        return 'ExtensionName';
    }

    public function initialize()
    {
        $this->app->before(array($this, 'before'));

        //register folder as additional twig source
        $this->app['twig.loader.filesystem']->addPath(__DIR__ . '/twig');

        /*
         * Extension config file:
         * You extension can have its own config file where your users can set some options
         * through the Bolt backend or any text editor.
         * Look at the file named config.yml.dist which is your config boilerplate.
         * You can edit it like you want so it fits your needs.
         * Bolt will copy it as {extension-name}.{vendor-name}.yml into /app/config/extensions when it doesn’t already exist there.
         * See also the section in the docs: https://docs.bolt.cm/extensions/essentials#using-your-own-configyml-file
         * */

        // dump the whole config on top of each page for debugging purpose
        //dump($this->config);

        // it's just a normal array
        $foo = $this->config['foo'];

        /*
         * Global application config:
         * You can also access the global application config.
         * There is a useful getter on the configuration object to access the different configuration file.
         * Struktur: get({file}/{key}/{subkey});
         * Unclear? Check out the following examples.
         * */

        $theme = $this->app['config']->get('general/theme', 'default'); // File 'config.yml', Key 'theme'

        $pagesContenttype = $this->app['config']->get('contenttypes/pages', 'default'); // File 'contenttypes.yml', Key 'pages'

        $mainMenuFirstItem = $this->app['config']->get('menu/main/0', 'default'); // File 'menu.yml', Key 'main', SubKey 0

        $roles = $this->app['config']->get('permissions/roles', 'default'); // File 'permissions.yml', Key 'roles'

        /*
         * Own Twig functions:
         * You can define methods inside this class as Twig functions.
         * How to use the following example in your template: {{ add_five_to(7) }}
         * It will display '12'.
         * */

        $this->addTwigFunction(
            'add_five_to', // Twig function name
            'addFiveTo'  // Method in this class (scroll down buddy)
        );

        /*
         * Own Fieldtypes:
         * You are not limited to the fieldtypes that are served by Bolt.
         * It's really easy to create your own.
         *
         * This example is just a simple textfield to show you
         * how to store and receive data.
         *
         * See also the documentation page for more information and a more complex example.
         * https://docs.bolt.cm/extensions/customfields
         * */

        $this->app['config']->getFields()->addField(new Field\ExampleField());

        /*
         * Routes:
         * Here you can register new routes in your Bolt application.
         * The first route will be handles in this Extension class,
         * then we switch to an extra Controller class for the routes.
         * */

        // register route for all GET requests on '/example/url' that will be handled in this class ($this) in the 'routeExampleUrl' function.
        $this->app
            ->get('/example/url', array($this, 'routeExampleUrl'))
            ->bind('example-url'); // route name, must be unique(!)

        // Mount the ExampleController class to all routes that match '/example/url/*'
        // To see specific bindings between route and controller method see 'connect()' function in the ExampleController class.
        $this->app->mount('/example/url', new ExampleController($this->app, $this->config));

        /*
         * Event Listener:
         * Did you know that Bolt fires events based on backend actions?
         * Now you know! :)
         * Let's register listeners for all 4 storage events.
         * The first listener will be an inline function, the three other ones will be in a separate class.
         * See also the documentation page:
         * https://docs.bolt.cm/extensions/essentials#adding-storage-events
         * */

        $this->app['dispatcher']->addListener(StorageEvents::PRE_SAVE, array($this, 'onPreSave'));

        $storageEventListener = new StorageEventListener($this->app, $this->config);
        $this->app['dispatcher']->addListener(StorageEvents::POST_SAVE, array($storageEventListener, 'onPostSave'));
        $this->app['dispatcher']->addListener(StorageEvents::PRE_DELETE, array($storageEventListener, 'onPreDelete'));
        $this->app['dispatcher']->addListener(StorageEvents::POST_DELETE, array($storageEventListener, 'onPostDelete'));

        /*
         * Extending the backend menu:
         * You can provide new Backend sites with their own menu option and template.
         * Here we will add a new route to the system and register the menu option in the backend.
         * You'll find the new menu option under "Extras".
         *
         * Note: The page don't has to be under the backend url. You can add any url to the backend menu.
         * */

        $backendRoot = $this->app['resources']->getUrl('bolt'); // get root url for the admin panel.

        $this->app
            ->get($backendRoot . 'my-custom-backend-page', array($this, 'exampleBackendPage'))
            ->bind('example-backend-page');

        $this->addMenuOption('Custom Page', $backendRoot . 'my-custom-backend-page', 'fa:child');
    }

    /**
     * Before middleware function
     *
     * @param Request $request
     */
    public function before(Request $request)
    {
        // execute only when in backend
        if ($this->app['config']->getWhichEnd() === 'backend') {
            $this->app['htmlsnippets'] = true;

            // add CSS and Javascript files to all requests in the backend
            $this->addCss('assets/extension.css');
            $this->addJavascript('assets/start.js', true);
        }

        // In Bolt 2.3+ getWhichEnd() has been deprecated and you should use
        // Zones insted
//      if (Zone::isBackend($request)) {
//          $this->addCss('assets/extension.css');
//          $this->addJavascript('assets/start.js', true);
//      }
//      if (Zone::isFrontend($request)) {
//      }
    }

    /**
     * Handles GET requests on /example/url
     *
     * @param Request $request
     *
     * @return Response
     */
    public function routeExampleUrl(Request $request)
    {
        $response = new Response('Hello, Bolt!', Response::HTTP_OK);

        return $response;
    }

    /**
     * Handles PRE_SAVE storage event
     *
     * @param StorageEvent $event
     */
    public function onPreSave(StorageEvent $event)
    {
        $contenttype = $event->getContentType(); // record contenttype
        $record = $event->getContent(); // record itself
        $created = $event->isCreate(); // if record was created, updated or deleted, for more information see the page in the documentation

        // Do whatever you want with this data
        // See page in the documentation for a logging example
    }

    /**
     * Add 5 to the given number
     *
     * @param $number
     *
     * @return int
     */
    public function addFiveTo($number)
    {
        return intval($number) + 5;
    }

    /**
     * Handles GET requests on /bolt/my-custom-backend-page and return a template
     *
     * @param Request $request
     *
     * @return mixed
     */
    public function exampleBackendPage(Request $request)
    {
        return $this->app['twig']->render('custom_backend_site.twig', ['title' => 'My Custom Page']);
    }
}

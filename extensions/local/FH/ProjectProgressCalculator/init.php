<?php

namespace Bolt\Extension\FH\ProjectProgressCalculator;

if (isset($app)) {
    $app['extensions']->register(new Extension($app));
}

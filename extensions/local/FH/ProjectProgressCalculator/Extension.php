<?php

namespace Bolt\Extension\FH\ProjectProgressCalculator;

use Bolt\Application;
use Bolt\BaseExtension;

class Extension extends BaseExtension
{

    public function initialize()
    {
        $this->addCss('assets/extension.css');
        $this->addJavascript('assets/start.js', true);

        // $this->addTwigFunction(
        //     'add_five_to', // Twig function name
        //     'addFiveTo'  // Method in this class (scroll down buddy)
        // );

        // Initialize the Twig filter
        $this->addTwigFilter('TimelineNowCalculator', 'TimelineNowCalculator');
        $this->addTwigFilter('TimelinePositionCalculator', 'TimelinePositionCalculator');
        $this->addTwigFilter('TimelineDurationCalculator', 'TimelineDurationCalculator');
        $this->addTwigFilter('ProjectProgressCalculator', 'ProjectProgressCalculator');
        $this->addTwigFilter('ProjectFaseCalculator', 'ProjectFaseCalculator');
        $this->addTwigFilter('ProjectFasePositionCalculator', 'ProjectFasePositionCalculator');
        $this->addTwigFilter('getWeeks', 'getWeeks');
        $this->addTwigFilter('getWeekDate', 'getWeekDate');
    }

    public function getWeeks($startdateTeam, $enddateTeam)
    {
        $internStart = strtotime($startdateTeam);
        $internEnd = strtotime($enddateTeam);
        $internDuration = $internEnd - $internStart;

        $weeks = floor($internDuration / 604800);

        return $weeks;
    }

    public function getWeekDate($week, $startdateTeam)
    {
        $seconds = $week * 604800 + $startdateTeam;
        $date = date('d-m-Y', strtotime($seconds));

        return $date;
    }

    public function getName()
    {
        return "ProjectProgressCalculator";
    }

// // calculate duration
//     private function calculateDuration($firstDate, $secondDate)
//     {
//         $startDate = strtotime($firstDate);
//         $endDate = strtotime($secondDate);
//
//         $duration = $endDate - $startDate;
//
//         return $duration;
//     }

//calculate current date
    public function TimelineNowCalculator($startdateTeam, $enddateTeam)
    {
        $internStart = strtotime($startdateTeam);
        $internEnd = strtotime($enddateTeam);

        $today = new \DateTime('NOW');
        $now = strtotime($today->format('Y-m-d')) - $internStart;

        $internDuration = $internEnd - $internStart;

        $internCompletion = 100 / $internDuration * $now;

        return new \Twig_Markup($internCompletion, 'UTF-8');
    }

// calculate position on Timeline
    public function TimelinePositionCalculator($startdateProject, $enddateProject, $startdateTeam, $enddateTeam)
    {
        $internStart = strtotime($startdateTeam);
        $internEnd = strtotime($enddateTeam);

        $internShipDuration = $internEnd - $internStart;

        $projectStart = strtotime($startdateProject);
        $projectEnd = strtotime($enddateProject);

        $projectDuration = $projectEnd - $projectStart;

        $projectStartPercentage = 100 / $internShipDuration * ($projectStart - $internStart);

        return new \Twig_Markup($projectStartPercentage, 'UTF-8');
    }

// calculate width on Timeline
    public function TimelineDurationCalculator($startdateProject, $enddateProject, $startdateTeam, $enddateTeam)
    {
        $internStart = strtotime($startdateTeam);
        $internEnd = strtotime($enddateTeam);

        $internShipDuration = $internEnd - $internStart;

        $projectStart = strtotime($startdateProject);
        $projectEnd = strtotime($enddateProject);

        $projectDuration = $projectEnd - $projectStart;

        $projectDurationPercentage = 100 / $internShipDuration * $projectDuration;

        return new \Twig_Markup($projectDurationPercentage, 'UTF-8');
    }

// calculate progression of project
    public function ProjectProgressCalculator($startdateProject, $enddateProject)
    {
        $projectStart = strtotime($startdateProject);
        $projectEnd = strtotime($enddateProject);

        $today = new \DateTime('NOW');
        $now = strtotime($today->format('Y-m-d')) - $projectStart;

        $projectDuration = $projectEnd - $projectStart;

        $projectCompletion = 100 / $projectDuration * $now;

        return new \Twig_Markup($projectCompletion, 'UTF-8');
    }

// calculate duration of fase
    public function ProjectFaseCalculator($startdateFase, $enddateFase, $startdateProject, $enddateProject)
    {
        $projectStart = strtotime($startdateProject);
        $projectEnd = strtotime($enddateProject);

        $projectDuration = $projectEnd - $projectStart;

        $faseStart = strtotime($startdateFase);
        $faseEnd = strtotime($enddateFase);

        $faseDuration = $faseEnd - $faseStart;

        $faseDurationPercentage = 100 / $projectDuration * $faseDuration;

        return new \Twig_Markup($faseDurationPercentage, 'UTF-8');
        // // get total days of fase and project
        // $faseDuration = $this->getDiff($startdateFase, $enddateFase);
        // $projectDuration = $this->getDiff($startdateProject, $enddateProject);
        //
        //
        // // get percentage of fase of project
        // $percentageFase = (100 / $projectDuration) * $faseDuration;
        //
        // return new \Twig_Markup($percentageFase, 'UTF-8');
    }

// calculate position of fase
    public function ProjectFasePositionCalculator($startdateFase, $enddateFase, $startdateProject, $enddateProject)
    {
        $projectStart = strtotime($startdateProject);
        $projectEnd = strtotime($enddateProject);

        $projectDuration = $projectEnd - $projectStart;

        $faseStart = strtotime($startdateFase);
        $faseEnd = strtotime($enddateFase);

        $faseDuration = $faseEnd - $faseStart;

        $faseStartPercentage = 100 / $projectDuration * ($faseStart - $projectStart);

        return new \Twig_Markup($faseStartPercentage, 'UTF-8');

    }
}

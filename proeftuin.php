<section class="dashboard-section dashboard-section-personal js-items">
    <div class="col-md-8 col-md-offset-2">
        <h1 class="pagetitle">Proeftuin <span>3.0</span></h1>
        <div class="item personal-item-1 col-md-3">
            <img class="item-img js-item" src="web/assets/frontend/src/img/personal/sam.png" data-target=".item-open-personal-1"/>
            <h3 class="title title-item">Sam</h3>
        </div>
        <div class="item personal-item-2 col-md-3">
            <img class="item-img js-item" src="web/assets/frontend/src/img/personal/pia.png" data-target=".item-open-personal-2"/>
            <h3 class="title title-item">Pia</h3>
        </div>
        <div class="item personal-item-3 col-md-3">
            <img class="item-img js-item" src="web/assets/frontend/src/img/personal/jeroen.png" data-target=".item-open-personal-3"/>
            <h3 class="title title-item">Jeroen</h3>
        </div>
        <div class="item personal-item-4 col-md-3">
            <img class="item-img js-item" src="web/assets/frontend/src/img/personal/aline.png" data-target=".item-open-personal-4"/>
            <h3 class="title title-item">Aline</h3>
        </div>
    </div>

            <?php
                include('personalinfo.php');
            ?>


    <div class="col-md-8 col-md-offset-2">
        <div class="item js-item personal-item-5 col-md-3" data-target=".item-open-personal-5">
            <img class="item-img js-item" src="web/assets/frontend/src/img/img.jpg"/>
            <h3 class="title title-item">Robbie de Ditcher</h3>
        </div>
    </div>
    <div class="item-open item-open-personal-5 js-info-block" data-target="5">
        <div class="col-md-8 col-md-offset-2">
            <div class="col-md-6 ">
                <h3 class="title title-item">Robbie de Ditcher</h3>
                <p class="subtitle subtitle-item">Backend</p>
                <a class="js-personalinfo" data-target=".skills-list">skills</a>
                    <ul class="personal-list skills-list">
                        <li>skill1</li>
                        <li>skill1</li>
                        <li>skill1</li>
                        <li>skill1</li>
                    </ul>
                <a class="js-personalinfo" data-target=".goals-list">leerdoelen</a>
                    <ul class="personal-list goals-list">
                        <li>leerdoel</li>
                        <li>leerdoel</li>
                        <li>leerdoel</li>
                        <li>leerdoel</li>
                    </ul>
                <a class="js-close">close</a>
            </div>
        </div>
    </div>
<div class="scrollto scrollTo-js">
    <a href="#">
        <i class="icon icon-down-circle"></i>
    </a>
</div>
</section>

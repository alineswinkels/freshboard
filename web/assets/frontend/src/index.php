<html>
<head>
<script src="//code.jquery.com/jquery-1.11.3.min.js"></script>
<link rel="stylesheet" href="web/assets/frontend/build/app.css" />
</head>
<body>

  <section class='freshboard'>
    <div class="freshboard-header">
      <div class='freshboard-logo'>
        <h1 class='freshboard-logo-title'>Freshboard</h1>
        <h2 class='freshboard-logo-subtitle'>proeftuin</h2>
      </div>
      <section class='freshboard-heads col-md-6 col-md-offset-3' role="navigation">
            <div class='freshboard-head js-freshboard-head freshboard-head-sam' alt='sam'></div>
            <div class='freshboard-head js-freshboard-head freshboard-head-pia' alt='pia'></div>
            <div class='freshboard-head js-freshboard-head freshboard-head-jeroen' alt='jeroen'></div>
            <div class='freshboard-head js-freshboard-head freshboard-head-aline' alt='aline'></div>
      </section>
    </div>
    <?php
      include('pia.php');
      include('jeroen.php');
      include('sam.php');
      include('aline.php');
    ?>
  </section>
  <script src="web/assets/frontend/build/app.js"></script>
  <script src="web/assets/frontend/src/js/unslider.js"></script>
  <script src="web/assets/frontend/src/js/script.js"></script>
</body>
</html>

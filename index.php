<?php include 'includes/header.php' ?>

<main>
    <section class="hero">
        <div class="container">
            <div class="text-container">
                <h1>Auto-detect, edit and extract tables from <span class="file-extension">pdf</span><span
                        class="file-extension-dummy">pdf</span> data sources
                </h1>
                <p>
                    Does your work involve copying and pasting tables? With Trndda,
                    all it takes is three clicks for you to extract tables from
                    txt, csv, xls, xlsx, docx, pdf, sas, spss, stata, htm, html, php and asp file extensions.
                </p>
                <p class="tryforfree">Try it for free!</p>
                <button class="button button-main show-signIn-signUp-modal show-signUp">Start Now</button>
            </div>
        </div>
        <img src="assets/images/trndda_homebk.png" alt="">

    </section>
    <section class="tutorial">
        <div class="container explanation">
            <div class="text-center">
                <h2>How Does it Work?</h2>
                <p class="tutorial__text">
                    Our automatic table detection web app enables you to edit and extract tables from documents in
                    real
                    time. Using our simple interface, it is easy to extract tables from both online and offline data
                    sources.
                    <br>
                    <!-- <a class="show-tutorial-video" ref="#">Watch a tutorial.</a> -->

                    <a href="https://www.youtube.com/watch?v=YpeI8dYvJl8" target="_blank"
                        rel="noopener noreferrer"><button class="button button-small mt-4">Watch
                            Tutorial</button></a>

                </p>
            </div>
        </div>

        <div class="container-wide">

            <div class="steps-container">
                <div class="step step-1 is-active">
                    <div class="step-header">
                        Step 1:
                    </div>
                    Upload a file or provide a URL. The app will automatically detect the tables. Select the table
                    number to load it.
                </div>
                <div class="step step-2">
                    <div class="step-header">
                        Step 2:
                    </div>
                    Edit table cells in real time by double clicking any cell from the selected table.
                </div>
                <div class="step step-3">
                    <div class="step-header">
                        Step 3:
                    </div>
                    Copy the selected table to the clipboard or download the selected table as a csv or excel file
                </div>
            </div>
            <div class="tutorial-lines-container tutorial-lines-container-md">
                <img class="tutorial-lines tutorial-lines-md" src="./assets/tutorial-lines-md.svg" alt="">
            </div>
            <div class="tutorial-lines-container tutorial-lines-container-lg">
                <img class="tutorial-lines tutorial-lines-lg" src="./assets/tutorial-lines-lg.svg" alt="">
            </div>

            <div class="laptop">
                <img class="laptop-img" src="./assets/laptop-green.svg" alt="">
                <div class="tutorial-video video-browse is-showing"></div>
                <div class="tutorial-video video-edit"></div>
                <div class="tutorial-video video-save"></div>

            </div>
            <div class="dots">
                <div class="dot dot-1 is-active"></div>
                <div class="dot dot-2"></div>
                <div class="dot dot-3"></div>
            </div>

            <div class="steps-container-mobile">
                <div class="step-mobile step-1 is-showing">
                    <div class="step-header-mobile">Step 1</div>
                    Upload a file or provide a URL. The app will automatically detect the tables. Select the table
                    number to load it.
                </div>
                <div class="step-mobile step-2">
                    <div class="step-header-mobile">Step 2</div>
                    Edit table cells in real time by double clicking any cell from the selected table.
                </div>
                <div class="step-mobile step-3">
                    <div class="step-header-mobile">Step 3</div>
                    Copy the selected table to the clipboard or download the selected table as a csv or excel file
                </div>
            </div>
        </div>

    </section>
    <section class="about">
        <div class="container">
            <div class="row">
                <div class="col-12 col-sm-6">
                    <h2>About Us</h2>
                    <p>
                        Trndda is a data extraction web platform established in 2019 to improve access to data. At
                        Trndda we
                        facilitate data access by liberating tables from txt, csv, xlsx, docx, pdf, sas, spss,
                        stata,
                        htm, html,
                        php and asp from online and offline data sources whiles making the data extraction
                        experience as
                        simple
                        as three clicks.
                    </p>
                </div>
                <div class="col-12 col-sm-6 d-none d-sm-block">
                    <!-- <img src="assets/images/trndda_bubble_bk.png" alt=""> -->
                    <img src="assets/images/illustration-sources-small-2.png" alt="">
                </div>
            </div>
        </div>

    </section>

    <section class="contact">
        <div class="container">
            <h2>Have any feedback? Drop us a message.</h2>
            <form action="http://www.trndda.com/contactus.php" method="POST">
                <div class="form-group">
                    <label for="">Where should we contact you?</label>
                    <input class="form-control" placeholder="Email" required="true" type="text" name="email"
                        maxlength="100">
                </div>
                <div class="form-group">
                    <label for="">Topic</label>
                    <input class="form-control" placeholder="Give us feedback" required="false" type="text"
                        name="topic" maxlength="100">
                </div>
                <div class="form-group">
                    <label for="">Message</label>
                    <textarea class="form-control" placeholder="Your message" required="true" name="message"
                        cols="30" rows="5" placeholder="Enter your message"></textarea>
                </div>
                <input class="button" type="submit" value="Send Message">
                <p class="mt-3 text-medium-small">
                    Alternatively, email us at
                    <a class="c-blue" href="mailto:trndda2015@gmail.com?subject=Enquiry:">trndda2015@gmail.com</a>.
                </p>
            </form>
        </div>

    </section>
    

<?php include 'includes/footer.php' ?>
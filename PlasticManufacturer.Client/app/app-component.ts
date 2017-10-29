import { Component } from '@angular/core'

@Component({
    selector: 'system-app',
    template: ` <div id="wrapper">
                    <nav-bar></nav-bar>
                     <!--Content-->
                    <div id="content">
                        <!-- Shell -->
                        <div class="shell">
                            <!-- White Box -->
                            <div class="white-box">
                                <div class="cnt">
                                           
                                        <router-outlet></router-outlet>
                                </div>
                            </div>
                            <!-- END White Box -->
                        </div>
                        <!-- END Shell -->
                    </div>
                    <!-- END Content -->
                     <!-- Footer -->
                    <div id="footer">
                        <!-- Shell -->
                        <div class="shell">
                            <p class="ac">&copy; Copyright 2009-2010 - All rights reserved. F&amp;D Plastics Administrative Panel - Design by <a href="#">Stories</a></p>
                        </div>
                        <!-- END Shell -->
                    </div>
                    <!-- END Footer -->
                </div>`                    
})
export class AppComponent {

}
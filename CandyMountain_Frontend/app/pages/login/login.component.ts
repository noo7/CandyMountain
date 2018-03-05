import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Page } from "ui/page";


import { User } from "../../shared/user/user";
import { UserService } from "../../shared/user/user.service";


@Component({
  selector: "my-app",
//  providers: [UserService],
  templateUrl: "./pages/login/login.html",
  styleUrls: ["./pages/login/login-common.css", "./pages/login/login.css"]
})


export class LoginComponent implements OnInit{
  user: User;
  isLoggingIn = true;

  constructor(private router: Router, private userService: UserService, private page : Page) {
    this.user = new User();
    this.user.email = "test1@gmail.com";
    this.user.password = "test1";
  }

  ngOnInit() {
    this.page.actionBarHidden = true;
    this.page.backgroundImage = "res://background";
  }

  submit() {
    if (this.isLoggingIn) {
      this.login();
    } else {
      this.signUp();
    }
  }
  login() {
    this.userService.login(this.user)
    .subscribe(
      () => this.router.navigate(["/activity-list"]),
      (error) => alert("Unfortunately we could not find your account.")
    );
  }
  signUp() {
    this.userService.register(this.user)
      .subscribe(
        () => {
          alert("Your account was successfully created.");
          this.toggleDisplay();
        },
        () => alert("Unfortunately we were unable to create your account.")
      );
  }
  toggleDisplay() {
    this.isLoggingIn = !this.isLoggingIn;
  }
  showMap() {
    this.router.navigate(['/map']);
  }
}
import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

import { User } from "./user";
import { Config } from "../config";

@Injectable()
export class UserService {
  private loggedInUser :  User;
  constructor(private http: Http) {}

  register(user: User) {
    console.log(user.email);
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    return this.http.post(Config.localServer + "user/register", JSON.stringify({
      email: user.email,
      password: user.password,
      age: user.age
    }), {headers: headers}).catch(this.handleErrors);
  }
  getLoggedInUser() : User {
    return this.loggedInUser;
  }
  login(user: User) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http.post(
      Config.localServer + "user/login" ,
      JSON.stringify({
        email: user.email,
        password: user.password
      }),
      { headers: headers }
    )
    .map(response => response.json())
    .do(jsonData => {
      this.loggedInUser = new User();
      this.loggedInUser.id = jsonData.id;
      this.loggedInUser.email = jsonData.email;
      this.loggedInUser.password = jsonData.password;
      this.loggedInUser.age = jsonData.age;
    })
    .catch(this.handleErrors);
  }

  handleErrors(error: Response) {
    console.log(JSON.stringify(error.json()));
    return Observable.throw(error);
  }
}
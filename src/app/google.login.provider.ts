import { User } from "./user";

//import { SocialUser } from "../entities/user";

declare let gapi: any;

export class GoogleLoginProvider {

  public static readonly PROVIDER_ID: string = "GOOGLE";

  private static clientId = "47930794826-jivr6f6dq1cdrmqfti3si6msh8idc84i.apps.googleusercontent.com";
  private auth2: any;

  constructor() { }

  loadScript(id: string, src: string, onload: any): void {
    if (document.getElementById(id)) { return; }

    let signInJS = document.createElement("script");
    signInJS.async = true;
    signInJS.src = src;
    signInJS.onload = onload;
    document.head.appendChild(signInJS);
}

  initialize(): Promise<User> {
    return new Promise((resolve, reject) => {
      this.loadScript(GoogleLoginProvider.PROVIDER_ID,
        "https://apis.google.com/js/platform.js",
        () => {
          gapi.load('auth2', () => {
            this.auth2 = gapi.auth2.init({
              client_id: GoogleLoginProvider.clientId,
              scope: 'email'
            });

            this.auth2.then(() => {
              if (this.auth2.isSignedIn.get()) {
                let user: User = new User();
                let profile = this.auth2.currentUser.get().getBasicProfile();

                user.id = profile.getId();
                user.token = this.auth2.currentUser.get(true).getAuthResponse().id_token;
                user.username = profile.getName();
                user.email = profile.getEmail();
                user.photoUrl = profile.getImageUrl();
                user.firstName = profile.getGivenName();
                user.lastName = profile.getFamilyName();

                resolve(user);
              }
            });
          });
      });
    });
  }



  signIn(): Promise<User> {
    return new Promise((resolve, reject) => {
      let promise = this.auth2.signIn();

      promise.then((googleUser) => {
        let user: User = new User();
        let profile = this.auth2.currentUser.get().getBasicProfile();

        user.id = profile.getId();
        user.username = profile.getName();
        user.email = profile.getEmail();
        user.photoUrl = profile.getImageUrl();
        user.token = googleUser.getAuthResponse(true).id_token;
        

        resolve(user);
      });
    });
  }

  signOut(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.auth2.signOut().then((err: any) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

}
import { Component } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent {
  hamburguer: boolean = false;
  routeActually = "";
  items = [
    {
      title: "Home",
      link: "",
      icon: "",
    },
    {
      title: "Proyectos",
      link: "projects",
      icon: "",
    },
    {
      title: "Sobre mi",
      link: "about",
      icon: "",
    },
    {
      title: "Tecnologias",
      link: "tecnologies",
      icon: "",
    },
  ];

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.routeActually = this.router.url;
      }
    });
  }

  ngOninit() {}

  handleMenu() {
    this.hamburguer = !this.hamburguer;
  }
}

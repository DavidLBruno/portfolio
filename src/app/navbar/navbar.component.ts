import { Component } from "@angular/core";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent {
  hamburguer: boolean = false;
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

  ngOninit() {}

  handleMenu() {
    this.hamburguer = !this.hamburguer;
  }
}

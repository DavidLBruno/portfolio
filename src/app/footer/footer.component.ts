import { Component } from "@angular/core";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent {
  columns = [
    {
      title: "Sobre mi",
      subColumns: [
        {
          title: "",
        },
      ],
    },
    {
      title: "Redes sociales",
      subColumns: [
        {
          title: "Linkedin",
          link: "",
        },
        {
          title: "Instagram",
          link: "",
        },
        {
          title: "CODEFORCES",
          link: "",
        },
        {
          title: "LICHESS",
          link: "",
        },
      ],
    },
    {
      title: "Contacto",
      subColumns: [
        {
          title: "WhatsApp",
          link: "",
        },
        {
          title: "Telegram",
          link: "",
        },
        {
          title: "Mail",
          link: "",
        },
        {
          title: "",
          link: "",
        },
      ],
    },
  ];
}

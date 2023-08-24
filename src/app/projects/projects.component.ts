import { Component } from "@angular/core";

@Component({
  selector: "app-projects",
  templateUrl: "./projects.component.html",
  styleUrls: ["./projects.component.scss"],
})
export class ProjectsComponent {
  works = [
    {
      title: "Backend NodeJs",
      subtitle: "TheLabIT",
      desciption: "",
      tecnologias: [
        {
          title: "",
        },
      ],
    },
    {
      title: "FullStack",
      subtitle: "Freelance",

      desciption: "",
      tecnologias: [
        {
          title: "",
        },
      ],
    },
    {
      title: "Frontend Angular",
      subtitle: "Depsys",
      desciption: "",
      tecnologias: [
        {
          title: "",
        },
      ],
    },
  ];

  projects = [
    {
      title: "Portfolio",
      desciption: "Proyecto individual",
      tecnologias: [
        {
          title: "",
        },
      ],
    },
    {
      title: "Wallet digital",
      desciption: "Proyecto grupal",
      tecnologias: [
        {
          title: "",
        },
      ],
    },
    {
      title: "E-commerce",
      desciption: "Proyecto grupal",
      tecnologias: [
        {
          title: "",
        },
      ],
    },
    {
      title: "Pokemon",
      desciption: "Proyecto individual",
      tecnologias: [
        {
          title: "",
        },
      ],
    },
  ];
}

import { Routes } from '@angular/router'
import { HomeComponent } from './components/home/home.component'
import { ProjectsComponent } from './components/projects/projects.component'
import { AboutComponent } from './components/about/about.component'
import { TecnologiesComponent } from './components/tecnologies/tecnologies.component'

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'tecnologies', component: TecnologiesComponent },
]

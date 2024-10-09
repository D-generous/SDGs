import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { EnvironmentService } from '../services/environment.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landingpage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.css'
})
export class LandingpageComponent {

  isMenuOpen: boolean = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  
  constructor(public http:HttpClient, public service:EnvironmentService){}
  public candidates:any[]=[]
  ngOnInit(){
    this.getcandidate()

  }

  getcandidate(){

    this.service.landingPage().subscribe((data:any)=>{
      this.candidates = data  
    })
  }
}

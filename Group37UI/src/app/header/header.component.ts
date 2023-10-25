import { Component, OnInit } from "@angular/core";
import { ConfigService } from "../services/config.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MessagesService } from "../services/Messages/messages.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  isDropdownOpen = false;
  messageForm: FormGroup | any;

  constructor(
    public configService: ConfigService,
    public formBuilder: FormBuilder,
    public messagesService:MessagesService
  ) {}

  ngOnInit(): void {
    this.messageForm = this.formBuilder.group({
      from: [localStorage.getItem("USERNAME")],
      to: ["", Validators.required],
      message: ["", Validators.required]
    });
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  sendMessage(){
    this.messageForm.patchValue({
      from: localStorage.getItem("USERNAME")
   });
    this.messagesService.sendMessage(this.messageForm.value);
    this.isDropdownOpen=false;
  }
  
}

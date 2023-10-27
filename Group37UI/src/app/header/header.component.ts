import { ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from "@angular/core";
import { ConfigService } from "../services/config.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MessagesService } from "../services/Messages/messages.service";
declare var webkitSpeechRecognition: any;
import { TransferState, makeStateKey } from "@angular/platform-browser";
const configKey = makeStateKey("CONFIG");
import { isPlatformServer } from "@angular/common";
import Swal from "sweetalert2";

interface IWindow extends Window {
  webkitSpeechRecognition: any;
}

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  isDropdownOpen = false;
  messageForm!: FormGroup;
  voiceHandler: string = "HI";

  constructor(
    public configService: ConfigService,
    public formBuilder: FormBuilder,
    public messagesService: MessagesService,
    private cdr: ChangeDetectorRef,
    private state: TransferState,
    @Inject(PLATFORM_ID) private platformid: Object
  ) {}

  public voiceSearch() {
    if ("webkitSpeechRecognition" in window) {
      const vSearch = new webkitSpeechRecognition();
      vSearch.continuous = false;
      vSearch.interimresults = false;
      vSearch.lang = "en-US";
      vSearch.start();
  
      vSearch.onresult = (e: any) => {
        this.voiceHandler = e.results[0][0].transcript;
        this.cdr.detectChanges(); // Manually trigger change detection
        vSearch.stop();
      };
  
      vSearch.onerror = (e: any) => {
        console.log(e);
        vSearch.stop();
      };
    } else {
      console.log(this.state.get(configKey, undefined as any));
    }
  
    console.log(this.voiceHandler); // This should print the updated value
  }



  // public voiceSearch() {
  //   if ("webkitSpeechRecognition" in window) {
  //     const vSearch = new webkitSpeechRecognition();
  //     vSearch.continuous = false;
  //     vSearch.interimresults = false;
  //     vSearch.lang = "en-US";
  //     vSearch.start();
  //     vSearch.onresult = function (e: any) {
  //       this.voiceHandler = e.results[0][0].transcript;
  //       // console.log(this.voiceHandler);
  //       vSearch.stop();
        
  //     };
  //     vSearch.onerror = function (e: any) {
  //       console.log(e);
  //       vSearch.stop();
  //     };
  //   } else {
  //     console.log(this.state.get(configKey, undefined as any));
  //   }
  //   console.log(this.voiceHandler)
  // }

  

  ngOnInit(): void {
    this.messageForm = this.formBuilder.group({
      from: [localStorage.getItem("USERNAME")],
      to: ["", Validators.required],
      message: [""],
    });
  }

  updateMessageValue(computerValue: string) {
    this.messageForm.patchValue({
      message: computerValue,
    });
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  sendMessage() {
    this.messageForm.patchValue({
      from: localStorage.getItem("USERNAME"),
    });
    if(this.voiceHandler!="HI"){
      this.messageForm.patchValue({
      message: this.voiceHandler,
    });
    }
    console.log(this.messageForm.value);
    this.messagesService.sendMessage(this.messageForm.value);
    this.isDropdownOpen = false;
  }
}

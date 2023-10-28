import { ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from "@angular/core";
import { ConfigService } from "../services/config.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MessagesService } from "../services/Messages/messages.service";
declare var webkitSpeechRecognition: any;
import { TransferState, makeStateKey } from "@angular/platform-browser";
const configKey = makeStateKey("CONFIG");
import { isPlatformServer } from "@angular/common";
import Swal from "sweetalert2";
import { AIServiceService } from "../services/AI/aiservice.service";

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
  aiForm!: FormGroup;
  voiceHandler: string = "HI";

  constructor(
    public configService: ConfigService,
    public formBuilder: FormBuilder,
    public messagesService: MessagesService,
    private cdr: ChangeDetectorRef,
    public aIServiceService:AIServiceService,
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
  
    console.log(this.voiceHandler); 
  }



  textToSpeech(user:string, text:string){
    var finalMessage = user + " said " + text;
    var converter = new SpeechSynthesisUtterance();
    converter.text = finalMessage;
    speechSynthesis.speak(converter);
  }

  askAI(){
    // console.log(this.aiForm.get('question')?.value);
    this.aIServiceService.askLLM(this.aiForm.get('question')?.value);
  }

  ngOnInit(): void {
    this.messageForm = this.formBuilder.group({
      from: [localStorage.getItem("USERNAME")],
      to: ["", Validators.required],
      message: [""],
    });
    this.aiForm = this.formBuilder.group({
      question : ["", Validators.required]
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

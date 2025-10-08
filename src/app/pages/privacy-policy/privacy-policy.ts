import { Component, Inject, OnInit, LOCALE_ID } from '@angular/core';


@Component({
  selector: 'app-privacy-policy',
  imports: [],
  templateUrl: './privacy-policy.html',
  styleUrl: './privacy-policy.scss'
})
export class PrivacyPolicy implements OnInit {
  googlePolicyUrl: string = '';
  
  currentLocale: string;

  constructor(@Inject(LOCALE_ID) private localeId: string) {
    this.currentLocale = this.localeId.split('-')[0];
  }

  ngOnInit(): void {
    this.setGooglePolicyUrl();
  }
  
  setGooglePolicyUrl(): void {
    this.googlePolicyUrl = `https://policies.google.com/privacy?hl=${this.currentLocale}`;
  }
}

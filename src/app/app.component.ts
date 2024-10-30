import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { ChatMessageComponent } from '../chat-message/chat-message.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule, FormsModule, ChatMessageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'basic-chat';

  @ViewChild('dynamicContainer', { read: ViewContainerRef, static: true })
  dynamicContainer!: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  onSubmit(form: NgForm) {
    const text = form.value.textField;

    form.reset();

    this.addComponent(text);
  }

  addComponent(text: string) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ChatMessageComponent);
    const componentRef = this.dynamicContainer.createComponent(componentFactory);
    componentRef.instance.messageText = text;  // Set the input text on the dynamic component
  }
}

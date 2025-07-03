import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chatbot',
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css'],
})
export class ChatbotComponent {
  userInput = '';
  chatHistory: { sender: 'user' | 'bot'; message: string }[] = [];
  loading = false;

  constructor(private http: HttpClient) {}

  sendMessage(): void {
    const message = this.userInput.trim();
    if (!message) return;

    this.chatHistory.push({ sender: 'user', message });
    this.userInput = '';
    this.loading = true;

    this.http
      .post<any>('https://hotel-booking-backend-74ai.onrender.com/chat', {
        message,
      })
      .subscribe({
        next: (response) => {
          this.chatHistory.push({
            sender: 'bot',
            message: response.reply || '🤖 No response',
          });

          if (response.hotels) {
            response.hotels.forEach((hotel: any) => {
              this.chatHistory.push({
                sender: 'bot',
                message: `🏨 ${hotel.hotelName} - ₹${hotel.pricePerNight}`,
              });
            });
          }

          if (response.razorpay_order_id) {
            this.chatHistory.push({
              sender: 'bot',
              message: `Payment order created. Order ID: ${response.razorpay_order_id}`,
            });
          }

          this.loading = false;
        },
        error: (err) => {
          console.error('Error:', err);
          this.chatHistory.push({
            sender: 'bot',
            message: 'Error processing request. Please try again.',
          });
          this.loading = false;
        },
      });
  }

  showChat = false;

  toggleChat(): void {
    this.showChat = !this.showChat;
    setTimeout(() => {
      const chatBody = document.getElementById('chat-body');
      if (chatBody) {
        chatBody.scrollTop = chatBody.scrollHeight;
      }
    }, 100);
  }
}

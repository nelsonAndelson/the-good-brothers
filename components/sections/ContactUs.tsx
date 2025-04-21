"use client"

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import emailjs from '@emailjs/browser';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import Link from 'next/link';

// Zod schema for contact form
const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

// Type for our form data
type ContactFormValues = z.infer<typeof contactSchema>;

const ContactUs = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Initialize form with React Hook Form + Zod
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  // Handle form submission
  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Log the form data to verify what we're sending
      console.log("Raw form data:", data);
      
      // Format current date and time for the template
      const now = new Date();
      
      // Create the simplest possible object that matches the template exactly
      // Do not use a complex structure to avoid any transformation issues
      const templateData = {
        // Essential template variables that match the template exactly
        subject: `Contact from ${data.name} <${data.email}>`, // Include email in subject as fallback
        form_source: "Contact Form - The Good Brothers Website",
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString(),
        form_type: "contact_us",
        
        // Contact form fields - using camelCase and underscores for maximum compatibility
        name: data.name,
        email: data.email,                  // Standard template variable
        email_address: data.email,          // Alternative format
        user_email: data.email,             // Alternative format
        contact_email: data.email,          // Alternative format
        message: `[SENDER EMAIL: ${data.email}]\n\n${data.message}`, // Include email in message
        
        // Include the email in plaintext in the message as a fallback
        message_with_email: `From: ${data.name} (${data.email})\n\n${data.message}`,
        
        // Add raw, unprocessed data for debugging
        raw_email: JSON.stringify(data.email),
        all_data: JSON.stringify(data),
        
        // Standard EmailJS fields for compatibility
        from_name: data.name,
        to_name: "The Good Brothers Team",
        reply_to: data.email,
      };
      
      console.log("Sending with template data:", JSON.stringify(templateData, null, 2));
      
      /* 
      IMPORTANT: Add this to your EmailJS template to ensure email display:
      
      {{#if_eq form_type "contact_us"}}
        <!-- Contact Us Form Details -->
        <h3>General Contact Message</h3>
        <p><strong>Name:</strong> {{name}}</p>
        <p><strong>Email:</strong> 
          {{#if email}}
            {{email}}
          {{else if email_address}}
            {{email_address}}
          {{else if user_email}}
            {{user_email}}
          {{else if contact_email}}
            {{contact_email}}
          {{else if raw_email}}
            {{raw_email}}
          {{else}}
            [Email not captured - see message]
          {{/if}}
        </p>
        <p><strong>Subject:</strong> {{subject}}</p>
        <p><strong>Message:</strong> {{message_with_email}}</p>
      {{/if_eq}}
      */
      
      // Use a simpler direct approach to EmailJS sending
      const response = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        templateData,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );
      
      console.log("EmailJS response:", response);
      
      toast({
        title: "Message sent successfully",
        description: "We'll get back to you as soon as possible.",
      });
      
      form.reset();
    } catch (error) {
      console.error("EmailJS Error:", error);
      
      let errorMessage = "Failed to send your message. Please try again.";
      
      if (error instanceof Error) {
        console.error("Detailed error:", error.message);
        if (process.env.NODE_ENV === 'development') {
          errorMessage = `Error: ${error.message}`;
        }
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full py-16 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">
              Contact Us
            </h2>
            
            <p className="text-gray-700">
              We&apos;d love to hear from you! Whether you have questions about our services, 
              need to report an issue, or want to learn more, we&apos;re here to help.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500 mt-1">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <Link href="tel:+12163749817">
                  <p className="text-gray-700">(216) 374-9817</p>
                </Link>
              </div>
              
              <div className="flex items-start space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500 mt-1">
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
                <Link href="mailto:th3goodbroth3rssnackstreat@gmail.com">
                  <p className="text-gray-700">th3goodbroth3rssnackstreat@gmail.com</p>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="you@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="How can we help?" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={4}
                          placeholder="Your message here..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs; 
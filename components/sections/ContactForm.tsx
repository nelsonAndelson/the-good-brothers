'use client'

import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import emailjs from '@emailjs/browser';
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
} from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";

// Zod schema for service request form
const serviceSchema = z.object({
  businessName: z.string().min(2, "Business name is required"),
  contactName: z.string().min(2, "Contact name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  location: z.string().min(5, "Business location is required"),
  serviceType: z.string().min(1, "Please select a service type"),
  additionalInfo: z.string().optional(),
});

// Zod schema for issue report form
const issueSchema = z.object({
  machineLocation: z.string().min(1, "Machine location is required"),
  machineId: z.string().min(1, "Machine ID is required"),
  problemType: z.string().min(1, "Problem type is required"),
  userName: z.string().min(2, "Your name is required"),
  contactInfo: z.string().min(5, "Contact information is required"),
  issueDescription: z.string().min(10, "Please provide a detailed description"),
});

// Types for our form data
type ServiceFormValues = z.infer<typeof serviceSchema>;
type IssueFormValues = z.infer<typeof issueSchema>;

// Define ContactFormHandle interface for ref
export interface ContactFormHandle {
  switchTab: (tab: 'service' | 'issue') => void;
}

// Define props interface
interface ContactFormProps extends Record<string, never> {}

const ContactForm = forwardRef<ContactFormHandle, ContactFormProps>((props, ref) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("service");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Expose methods through the ref
  useImperativeHandle(ref, () => ({
    switchTab: (tab: 'service' | 'issue') => {
      setActiveTab(tab);
    }
  }));

  // Initialize forms with React Hook Form + Zod
  const serviceForm = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      businessName: "",
      contactName: "",
      email: "",
      phone: "",
      location: "",
      serviceType: "",
      additionalInfo: "",
    },
  });

  const issueForm = useForm<IssueFormValues>({
    resolver: zodResolver(issueSchema),
    defaultValues: {
      machineLocation: "",
      machineId: "",
      problemType: "",
      userName: "",
      contactInfo: "",
      issueDescription: "",
    },
  });

  // Generic email sending function
  const sendEmail = async (formData: Record<string, unknown>, formType: string, onSuccess: () => void) => {
    setIsSubmitting(true);
    
    try {
      // Map select values to their full display names
      const machineLocationMap: Record<string, string> = {
        "stamps": "Stamps",
        "106": "106 Body Shop",
        "slaughter": "Slaughter House Customs"
      };
      
      const problemTypeMap: Record<string, string> = {
        "mechanical": "Mechanical Issue",
        "electrical": "Electrical Issue",
        "software": "Software Issue",
        "restocking": "Restocking Request",
        "other": "Other"
      };
      
      const serviceTypeMap: Record<string, string> = {
        "installation": "New Installation",
        "maintenance": "Maintenance",
        "repair": "Repair",
        "upgrade": "Upgrade"
      };
      
      // Get the display names for select fields
      const getDisplayName = (value: string | undefined, map: Record<string, string>): string => {
        if (!value) return "";
        return map[value] || value;
      };
      
      // Format current date and time
      const now = new Date();
      const date = now.toLocaleDateString();
      const time = now.toLocaleTimeString();
      
      // Create simple message formats that can be included in the email
      let plainTextMessage = "";
      if (formType === "service_request") {
        plainTextMessage = `
Service Request Details:
Business: ${formData.businessName as string || ""}
Contact: ${formData.contactName as string || ""}
Phone: ${formData.phone as string || ""}
Email: ${formData.email as string || ""}
Location: ${formData.location as string || ""}
Service Type: ${getDisplayName(formData.serviceType as string, serviceTypeMap)}

Additional Info: ${formData.additionalInfo as string || "None provided"}
        `;
      } else {
        plainTextMessage = `
Issue Report Details:
Machine Location: ${getDisplayName(formData.machineLocation as string, machineLocationMap)}
Machine ID: ${formData.machineId as string || ""}
Problem Type: ${getDisplayName(formData.problemType as string, problemTypeMap)}
Reported By: ${formData.userName as string || ""}
Contact: ${formData.contactInfo as string || ""}

Description: ${formData.issueDescription as string || ""}
        `;
      }
      
      // Create a simple object with direct variable mapping - similar to ContactUs.tsx approach
      const templateParams = {
        // Essential template variables
        subject: formType === "service_request" 
          ? `New Service Request from ${formData.businessName as string}` 
          : `Issue Report from ${formData.userName as string}`,
        form_source: "The Good Brothers Website",
        date: date,
        time: time,
        form_type: formType,
        
        // Direct field mappings that match the template variables
        business_name: (formData.businessName as string) || "",
        name: formType === "service_request" ? (formData.contactName as string) : (formData.userName as string),
        email: formType === "service_request" ? (formData.email as string) : (formData.contactInfo as string),
        phone: (formData.phone as string) || "",
        location: (formData.location as string) || "",
        service_type: getDisplayName(formData.serviceType as string, serviceTypeMap),
        additionalInfo: (formData.additionalInfo as string) || "None provided",
        
        machine_location: getDisplayName(formData.machineLocation as string, machineLocationMap),
        machine_id: (formData.machineId as string) || "",
        problem_type: getDisplayName(formData.problemType as string, problemTypeMap),
        issueDescription: (formData.issueDescription as string) || "",
        
        // Include a complete message as fallback (important)
        message: plainTextMessage,
        
        // Standard EmailJS fields for compatibility
        from_name: formType === "service_request" ? (formData.contactName as string) : (formData.userName as string),
        to_name: "The Good Brothers Team",
        reply_to: formType === "service_request" ? (formData.email as string) : (formData.contactInfo as string),
        
        // Include multiple email formats for compatibility - this worked in ContactUs.tsx
        email_address: formType === "service_request" ? (formData.email as string) : (formData.contactInfo as string),
        user_email: formType === "service_request" ? (formData.email as string) : (formData.contactInfo as string),
        contact_email: formType === "service_request" ? (formData.email as string) : (formData.contactInfo as string)
      };
      
      // Log what we're sending
      console.log(`Using EmailJS service ID: ${process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID}`);
      console.log(`Using template ID: ${process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID}`);
      console.log("Sending email with template parameters:", JSON.stringify(templateParams, null, 2));
      
      const response = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );
      
      console.log("EmailJS response:", response);
      
      toast({
        title: formType === "service_request" 
          ? "Service request submitted" 
          : "Issue report submitted",
        description: "We'll get back to you as soon as possible.",
      });
      
      onSuccess();
    } catch (error) {
      console.error("EmailJS Error:", error);
      let errorMessage = "Failed to submit your form. Please try again.";
      
      if (error instanceof Error) {
        console.error("Error details:", error.message);
        // Only show detailed error in development
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

  // Handle service form submission
  const onServiceSubmit = async (data: ServiceFormValues) => {
    await sendEmail(data, "service_request", () => serviceForm.reset());
  };

  // Handle issue form submission  
  const onIssueSubmit = async (data: IssueFormValues) => {
    await sendEmail(data, "issue_report", () => issueForm.reset());
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Tabs 
        value={activeTab}
        className="w-full"
        onValueChange={(value) => setActiveTab(value)}
        id="contact-form-tabs"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="service" data-value="service">New Service Request</TabsTrigger>
          <TabsTrigger value="issue" data-value="issue">Report an Issue or Restocking</TabsTrigger>
        </TabsList>
        
        <TabsContent value="service" className="space-y-6">
          <Form {...serviceForm}>
            <form onSubmit={serviceForm.handleSubmit(onServiceSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={serviceForm.control}
                  name="businessName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your business name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={serviceForm.control}
                  name="contactName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={serviceForm.control}
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
                
                <FormField
                  control={serviceForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="(216) 555-0123" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={serviceForm.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Business address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={serviceForm.control}
                name="serviceType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select service type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="installation">New Installation</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="repair">Repair</SelectItem>
                        <SelectItem value="upgrade">Upgrade</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={serviceForm.control}
                name="additionalInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Information</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Please provide any additional details about your service request"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Service Request"}
              </Button>
            </form>
          </Form>
        </TabsContent>
        
        <TabsContent value="issue" className="space-y-6">
          <Form {...issueForm}>
            <form onSubmit={issueForm.handleSubmit(onIssueSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={issueForm.control}
                  name="machineLocation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Machine Location</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select machine location" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="stamps">Stamps</SelectItem>
                          <SelectItem value="106">106 Body Shop</SelectItem>
                          <SelectItem value="slaughter">Slaughter House Customs</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={issueForm.control}
                  name="machineId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Machine ID</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter machine ID" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={issueForm.control}
                  name="problemType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Problem Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select problem type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="mechanical">Mechanical Issue</SelectItem>
                          <SelectItem value="electrical">Electrical Issue</SelectItem>
                          <SelectItem value="software">Software Issue</SelectItem>
                          <SelectItem value="restocking">Restocking Request</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={issueForm.control}
                  name="userName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={issueForm.control}
                name="contactInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Information</FormLabel>
                    <FormControl>
                      <Input placeholder="Email or phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={issueForm.control}
                name="issueDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Issue Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Please describe the issue or restocking request in detail"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Report"}
              </Button>
            </form>
          </Form>
        </TabsContent>
      </Tabs>
    </div>
  );
});

export default ContactForm;

// Set display name
ContactForm.displayName = 'ContactForm'; 
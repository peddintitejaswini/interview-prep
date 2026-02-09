import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Loader } from "lucide-react";

const formSchema = z.object({
  title: z
    .string()
    .min(1, "Job title is required")
    .max(100, "Title must be 100 characters or less"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  techStack: z.string().min(1, "Tech stack is required"),
  experience: z.coerce.number().min(0, "Experience cannot be negative"),
});

type FormData = z.infer<typeof formSchema>;

interface FormJdProps {
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
}

const FormJd = ({ onSubmit, onCancel }: FormJdProps) => {
  const form = useForm<FormData>({
    //@ts-ignore
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      techStack: "",
      experience: 0,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const handleSubmit = (data: FormData) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>Job Title / Position</FormLabel>
                <FormMessage className="text-sm" />
              </div>
              <FormControl>
                <Input
                  className="h-12"
                  placeholder="e.g., Senior React Developer"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>Job Description</FormLabel>
                <FormMessage className="text-sm" />
              </div>
              <FormControl>
                <Textarea
                  className="min-h-32"
                  placeholder="Paste the full job description here..."
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="techStack"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>Tech Stack / Skills Required</FormLabel>
                <FormMessage className="text-sm" />
              </div>
              <FormControl>
                <Textarea
                  className="h-20"
                  placeholder="e.g., React, TypeScript, Node.js, PostgreSQL"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="experience"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>Years of Experience Required</FormLabel>
                <FormMessage className="text-sm" />
              </div>
              <FormControl>
                <Input
                  type="number"
                  className="h-12"
                  placeholder="e.g., 3"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex items-center justify-end gap-4 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting || !isValid}>
            {isSubmitting ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create JD"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FormJd;

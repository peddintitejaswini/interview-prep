import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
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
  experience: z.coerce.number().min(0, "Experience cannot be negative"),
  daysRemaining: z.coerce
    .number()
    .min(7, "Minimum 7 days required")
    .max(365, "Maximum 365 days allowed"),
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
      experience: 0,
      daysRemaining: 30,
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
                  placeholder="Paste the full job description here... (Tech stack will be extracted automatically)"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                We'll automatically extract the required skills and technologies
                from this description
              </FormDescription>
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

        <FormField
          control={form.control}
          name="daysRemaining"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>Time Available (Days)</FormLabel>
                <FormMessage className="text-sm" />
              </div>
              <FormControl>
                <Input
                  type="number"
                  className="h-12"
                  placeholder="e.g., 60"
                  min="7"
                  max="365"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {field.value
                  ? `Approximately ${Math.ceil(field.value / 7)} weeks`
                  : "Enter days between 7 and 365"}
              </FormDescription>
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
                Creating & Generating...
              </>
            ) : (
              "Create JD & Generate Roadmap"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FormJd;

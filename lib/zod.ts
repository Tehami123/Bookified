import z from 'zod';

export const UploadSchema = z.object({
  pdf: z
    .instanceof(File)
    .refine((file) => file.size <= 50 * 1024 * 1024, {
      message: 'PDF file must be less than 50MB',
    })
    .refine((file) => file.type === 'application/pdf', {
      message: 'File must be a PDF',
    }),
  coverImage: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => !file || ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
      {
        message: 'Cover image must be JPEG, PNG, or WebP',
      }
    )
    .refine((file) => !file || file.size <= 10 * 1024 * 1024, {
      message: 'Cover image must be less than 10MB',
    }),
  title: z
    .string()
    .min(1, 'Title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(200, 'Title must be less than 200 characters'),
  author: z
    .string()
    .min(1, 'Author name is required')
    .min(2, 'Author name must be at least 2 characters')
    .max(100, 'Author name must be less than 100 characters'),
  voice: z.enum(['dave', 'daniel', 'chris', 'rachel', 'sarah']).refine((val) => val, {
    message: 'Please select a voice',
  }),
});

export type UploadFormValues = z.infer<typeof UploadSchema>;

export const VOICES = {
  maleVoices: [
    {
      id: 'dave',
      name: 'Dave',
      description: 'Young male, British: Essex',
    },
    {
      id: 'daniel',
      name: 'Daniel',
      description: 'Middle-aged male, British: warm',
    },
    {
      id: 'chris',
      name: 'Chris',
      description: 'Male, casual & easy-going',
    },
  ],
  femaleVoices: [
    {
      id: 'rachel',
      name: 'Rachel',
      description: 'Young female, American: calm & clear',
    },
    {
      id: 'sarah',
      name: 'Sarah',
      description: 'Young female, American: soft & approachable',
    },
  ],
};

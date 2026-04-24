'use client';

import React, { useState } from 'react';
import { Upload, Image as ImageIcon, X } from 'lucide-react';
import LoadingOverlay from './LoadingOverlay';
import { VOICES } from '@/lib/zod';

interface FormData {
  pdf: File | null;
  coverImage: File | null;
  title: string;
  author: string;
  voice: string;
}

interface FormErrors {
  pdf?: string;
  coverImage?: string;
  title?: string;
  author?: string;
  voice?: string;
}

const UploadForm = () => {
  const [formData, setFormData] = useState<FormData>({
    pdf: null,
    coverImage: null,
    title: '',
    author: '',
    voice: 'rachel',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState<Array<{ label: string; completed: boolean }>>([]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.pdf) {
      newErrors.pdf = 'PDF file is required';
    } else if (formData.pdf.size > 50 * 1024 * 1024) {
      newErrors.pdf = 'PDF file must be less than 50MB';
    } else if (formData.pdf.type !== 'application/pdf') {
      newErrors.pdf = 'File must be a PDF';
    }

    if (formData.coverImage) {
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(formData.coverImage.type)) {
        newErrors.coverImage = 'Cover image must be JPEG, PNG, or WebP';
      } else if (formData.coverImage.size > 10 * 1024 * 1024) {
        newErrors.coverImage = 'Cover image must be less than 10MB';
      }
    }

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    } else if (formData.title.length > 200) {
      newErrors.title = 'Title must be less than 200 characters';
    }

    if (!formData.author.trim()) {
      newErrors.author = 'Author name is required';
    } else if (formData.author.length < 2) {
      newErrors.author = 'Author name must be at least 2 characters';
    } else if (formData.author.length > 100) {
      newErrors.author = 'Author name must be less than 100 characters';
    }

    if (!formData.voice) {
      newErrors.voice = 'Please select a voice';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, fileType: 'pdf' | 'coverImage') => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        [fileType]: file,
      }));
      setErrors((prev) => ({
        ...prev,
        [fileType]: undefined,
      }));
    }
  };

  const handleRemoveFile = (fileType: 'pdf' | 'coverImage') => {
    setFormData((prev) => ({
      ...prev,
      [fileType]: null,
    }));
    setErrors((prev) => ({
      ...prev,
      [fileType]: undefined,
    }));
  };

  const handleInputChange = (field: 'title' | 'author', value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));
  };

  const handleVoiceChange = (voiceId: string) => {
    setFormData((prev) => ({
      ...prev,
      voice: voiceId,
    }));
    setErrors((prev) => ({
      ...prev,
      voice: undefined,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setLoadingProgress([
      { label: 'Uploading PDF...', completed: false },
      { label: 'Processing cover image...', completed: false },
      { label: 'Preparing audio synthesis...', completed: false },
    ]);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 3000));

      setLoadingProgress([
        { label: 'Uploading PDF...', completed: true },
        { label: 'Processing cover image...', completed: true },
        { label: 'Preparing audio synthesis...', completed: true },
      ]);

      // Here you would typically call your API endpoint
      const formDataToSend = new FormData();
      if (formData.pdf) formDataToSend.append('pdf', formData.pdf);
      if (formData.coverImage) formDataToSend.append('coverImage', formData.coverImage);
      formDataToSend.append('title', formData.title);
      formDataToSend.append('author', formData.author);
      formDataToSend.append('voice', formData.voice);

      console.log('Form submitted:', { ...formData, pdf: formData.pdf?.name, coverImage: formData.coverImage?.name });

      // Reset form on success
      setFormData({
        pdf: null,
        coverImage: null,
        title: '',
        author: '',
        voice: 'rachel',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
      setLoadingProgress([]);
    }
  };

  return (
    <>
      <LoadingOverlay isVisible={isSubmitting} progress={loadingProgress} />

      <div className="new-book-wrapper">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* PDF Upload */}
          <div>
            <label htmlFor="pdf-upload" className="form-label">
              Book PDF File
            </label>
            <div
              className={`upload-dropzone ${formData.pdf ? 'upload-dropzone-uploaded' : ''} border-2 border-dashed border-[var(--border-subtle)] ${
                errors.pdf ? 'border-red-500' : ''
              }`}
              onClick={() => document.getElementById('pdf-input')?.click()}
            >
              {!formData.pdf ? (
                <>
                  <Upload className="upload-dropzone-icon" />
                  <p className="upload-dropzone-text">Click to upload PDF</p>
                  <p className="upload-dropzone-hint">PDF file (max 50MB)</p>
                </>
              ) : (
                <div className="flex items-center justify-between w-full px-4">
                  <div className="flex items-center gap-3">
                    <Upload className="w-5 h-5 text-[#663820]" />
                    <span className="upload-dropzone-text text-[#663820]">{formData.pdf.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFile('pdf');
                    }}
                    className="upload-dropzone-remove"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}
              <input
                id="pdf-input"
                type="file"
                accept=".pdf"
                onChange={(e) => handleFileUpload(e, 'pdf')}
                className="hidden"
              />
            </div>
            {errors.pdf && <p className="text-red-500 text-sm mt-2">{errors.pdf}</p>}
          </div>

          {/* Cover Image Upload */}
          <div>
            <label htmlFor="cover-upload" className="form-label">
              Cover Image (Optional)
            </label>
            <div
              className={`upload-dropzone ${formData.coverImage ? 'upload-dropzone-uploaded' : ''} border-2 border-dashed border-[var(--border-subtle)] ${
                errors.coverImage ? 'border-red-500' : ''
              }`}
              onClick={() => document.getElementById('cover-input')?.click()}
            >
              {!formData.coverImage ? (
                <>
                  <ImageIcon className="upload-dropzone-icon" />
                  <p className="upload-dropzone-text">Click to upload cover image</p>
                  <p className="upload-dropzone-hint">Leave empty to auto-generate from PDF</p>
                </>
              ) : (
                <div className="flex items-center justify-between w-full px-4">
                  <div className="flex items-center gap-3">
                    <ImageIcon className="w-5 h-5 text-[#663820]" />
                    <span className="upload-dropzone-text text-[#663820]">{formData.coverImage.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFile('coverImage');
                    }}
                    className="upload-dropzone-remove"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}
              <input
                id="cover-input"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={(e) => handleFileUpload(e, 'coverImage')}
                className="hidden"
              />
            </div>
            {errors.coverImage && <p className="text-red-500 text-sm mt-2">{errors.coverImage}</p>}
          </div>

          {/* Title Input */}
          <div>
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="ex: Rich Dad Poor Dad"
              className={`form-input border ${errors.title ? 'border-red-500' : 'border-[var(--border-subtle)]'}`}
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
            />
            {errors.title && <p className="text-red-500 text-sm mt-2">{errors.title}</p>}
          </div>

          {/* Author Input */}
          <div>
            <label htmlFor="author" className="form-label">
              Author Name
            </label>
            <input
              id="author"
              type="text"
              placeholder="ex: Robert Kiyosaki"
              className={`form-input border ${errors.author ? 'border-red-500' : 'border-[var(--border-subtle)]'}`}
              value={formData.author}
              onChange={(e) => handleInputChange('author', e.target.value)}
            />
            {errors.author && <p className="text-red-500 text-sm mt-2">{errors.author}</p>}
          </div>

          {/* Voice Selector */}
          <div>
            <label className="form-label">Choose Assistant Voice</label>

            {errors.voice && <p className="text-red-500 text-sm mb-3">{errors.voice}</p>}

            {/* Male Voices */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-[var(--text-secondary)] mb-3">Male Voices</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {VOICES.maleVoices.map((voice) => (
                  <button
                    key={voice.id}
                    type="button"
                    onClick={() => handleVoiceChange(voice.id)}
                    className={`voice-selector-option ${
                      formData.voice === voice.id
                        ? 'voice-selector-option-selected'
                        : 'voice-selector-option-default'
                    }`}
                  >
                    <input
                      type="radio"
                      name="voice"
                      value={voice.id}
                      checked={formData.voice === voice.id}
                      onChange={() => handleVoiceChange(voice.id)}
                      className="w-4 h-4"
                    />
                    <div className="text-left flex-1">
                      <div className="font-semibold text-black">{voice.name}</div>
                      <div className="text-xs text-[var(--text-secondary)]">{voice.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Female Voices */}
            <div>
              <h3 className="text-sm font-semibold text-[var(--text-secondary)] mb-3">Female Voices</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {VOICES.femaleVoices.map((voice) => (
                  <button
                    key={voice.id}
                    type="button"
                    onClick={() => handleVoiceChange(voice.id)}
                    className={`voice-selector-option ${
                      formData.voice === voice.id
                        ? 'voice-selector-option-selected'
                        : 'voice-selector-option-default'
                    }`}
                  >
                    <input
                      type="radio"
                      name="voice"
                      value={voice.id}
                      checked={formData.voice === voice.id}
                      onChange={() => handleVoiceChange(voice.id)}
                      className="w-4 h-4"
                    />
                    <div className="text-left flex-1">
                      <div className="font-semibold text-black">{voice.name}</div>
                      <div className="text-xs text-[var(--text-secondary)]">{voice.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="form-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Processing...' : 'Begin Synthesis'}
          </button>
        </form>
      </div>
    </>
  );
};

export default UploadForm;

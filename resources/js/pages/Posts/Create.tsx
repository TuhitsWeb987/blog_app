import { FormEvent, useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import { CreateProps, PostFormData } from "@/types/posts";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Button } from "@/components/ui/button";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create',
        href: '/create',
    },
];


export default function Create({}: CreateProps) {
  const { data, setData, post, errors, reset, processing } = useForm<PostFormData>({
    title: '',
    description: '',
    image: null as File | null,
  })

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setData('image', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    post(route('posts.store'), {
      onSuccess: () => {
        reset();
        setPreviewUrl('');
      }
    })
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Créer un post" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Créer un post</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Titre</Label>
                  <Input id="title" value={data.title} onChange={e => setData('title', e.target.value)} />
                  {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" value={data.description} onChange={e => setData('description', e.target.value)} />
                  {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image">Image</Label>
                  <Input type="file" id="image" onChange={handleImageChange} accept="images/*" className="block py-2 file mr-4 file:rounded-md file:border-0 file:text-sm file:text-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"/>
                  {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
                  {previewUrl && (
                    <div className="mt-2">
                      <img src={previewUrl} alt="preview" className="max-h-48 rounded-md" />
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-end space-x-4">
                  <Button type="button" variant="outline" onClick={() => window.history.back()}>
                    Annuler
                  </Button>
                  <Button type="submit" disabled={processing}>
                    {processing ? 'Création...' : 'Créer le post'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

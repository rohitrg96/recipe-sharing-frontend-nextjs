import Image from 'next/image';

export const RecipeImage: React.FC<{ image: string | null; title: string }> = ({
  image,
  title,
}) => (
  <div className="flex-1">
    <div className="w-full h-80 md:h-full relative rounded-md shadow-lg overflow-hidden">
      <Image
        src={image || '/placeholder-image.jpg'}
        alt={title || 'Recipe Image'}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        priority
        className="rounded-md"
        style={{ objectFit: 'cover' }}
      />
    </div>
  </div>
);

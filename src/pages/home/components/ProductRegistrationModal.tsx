/*
import { NewProductDTO } from '@/api/dtos/productDTO';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ALL_CATEGORY_ID, categories } from '@/constants';
import { createNewProduct, initialProductState } from '@/helpers/product';
import { useAppDispatch } from '@/store/hooks';
import { addProduct } from '@/store/product/productsActions';
import { uploadImage } from '@/utils/imageUpload';
import { ChangeEvent, useState } from 'react';

interface ProductRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProductAdded: () => void;
}

export const ProductRegistrationModal: React.FC<
  ProductRegistrationModalProps
> = ({ isOpen, onClose, onProductAdded }) => {
  const dispatch = useAppDispatch();
  const [product, setProduct] = useState<NewProductDTO>(initialProductState);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setProduct((prev) => ({ ...prev, image: file }));
    }
  };

  const handleSubmit = async (): Promise<void> => {
    try {
      if (!product.image) {
        throw new Error('이미지를 선택해야 합니다.');
      }

      const imageUrl = await uploadImage(product.image as File);
      if (!imageUrl) {
        throw new Error('이미지 업로드에 실패했습니다.');
      }

      const newProduct = createNewProduct(product, imageUrl);
      await dispatch(addProduct(newProduct));
      onClose();
      onProductAdded();
    } catch (error) {
      console.error('물품 등록에 실패했습니다.', error);
    }
  };

  const handleCategoryChange = (value: string): void => {
    setProduct((prev) => ({
      ...prev,
      category: { ...prev.category, id: value },
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>상품 등록</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            name="title"
            placeholder="상품명"
            onChange={handleChange}
            value={product.title || ''}
          />
          <Input
            name="price"
            type="number"
            placeholder="가격"
            onChange={handleChange}
            value={product.price || ''}
          />
          <Textarea
            name="description"
            className="resize-none"
            placeholder="상품 설명"
            onChange={handleChange}
            value={product.description || ''}
          />
          <Select
            name="categoryId"
            onValueChange={handleCategoryChange}
            value={product.category.id || ''}
          >
            <SelectTrigger>
              <SelectValue placeholder="카테고리 선택" />
            </SelectTrigger>
            <SelectContent>
              {categories
                .filter((category) => category.id !== ALL_CATEGORY_ID)
                .map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          <Input
            className="cursor-pointer"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>등록</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

*/

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useProductsStore } from '@/store/product/productsStore';
import { uploadImage } from '@/utils/imageUpload';
import { createNewProduct, initialProductState } from '@/helpers/product';
import { NewProductDTO } from '../../../api/dtos/productDTO';
import { categories, ALL_CATEGORY_ID } from '@/constants';

interface ProductRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProductAdded: () => void;
}

export const ProductRegistrationModal: React.FC<ProductRegistrationModalProps> = ({
  isOpen,
  onClose,
  onProductAdded
}) => {
  const addProduct = useProductsStore(state => state.addProduct);
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<NewProductDTO>({
    defaultValues: initialProductState,
  });

  const onSubmit: SubmitHandler<NewProductDTO> = async (data) => {
    try {
      if (!data.image) {
        console.error('이미지를 선택해야 합니다.');
        return;
      }
      const imageUrl = await uploadImage(data.image as File);
      if (!imageUrl) {
        throw new Error('이미지 업로드에 실패했습니다.');
      }
      const newProduct = createNewProduct(data, imageUrl);
      await addProduct(newProduct);
      console.log('물품이 성공적으로 등록되었습니다.');
      onClose();
      onProductAdded();
    } catch (error) {
      console.error('물품 등록에 실패했습니다.', error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue('image', file);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>상품 등록</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            {...register('title', { required: '상품명은 필수입니다.' })}
            placeholder="상품명"
          />
          {errors.title && <p className="text-red-500">{errors.title.message}</p>}

          <Input
            {...register('price', { 
              required: '가격은 필수입니다.',
              min: { value: 0, message: '가격은 0 이상이어야 합니다.' }
            })}
            type="number"
            placeholder="가격"
          />
          {errors.price && <p className="text-red-500">{errors.price.message}</p>}

          <Textarea
            {...register('description', { required: '상품 설명은 필수입니다.' })}
            placeholder="상품 설명"
          />
          {errors.description && <p className="text-red-500">{errors.description.message}</p>}

          <Select
            onValueChange={(value) => setValue('category.id', value)}
            value={watch('category.id')}
          >
            <SelectTrigger>
              <SelectValue placeholder="카테고리 선택" />
            </SelectTrigger>
            <SelectContent>
              {categories
                .filter((category) => category.id !== ALL_CATEGORY_ID)
                .map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>

          <Input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="cursor-pointer"
          />

          <DialogFooter>
            <Button type="submit">등록</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
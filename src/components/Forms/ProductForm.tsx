"use client";
import React, {useRef, useState} from 'react';
import Input from "@/components/Inputs/Input";
import Select from "@/components/Inputs/Select";
import {Eye, ImageUp, Trash} from "@/components/Icons";
import SearchInput from "@/components/Inputs/SearchInput";
import Image from "next/image";
import Editor from "@/components/Inputs/Editor";

export interface Status {
    name: string;
    selected: boolean;
}

const ProductForm = () => {
    const [previewIndex, setPreviewIndex] = useState<number | null>(null);
    const inputProductImage = useRef<HTMLInputElement | null>(null);
    const [images, setImages] = useState<string[]>([]);
    const openInputImage = () => {
        inputProductImage.current?.click();
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        const newImages: string[] = [];
        if (files) {
            for (let i = 0; i < files.length; i++) {
                const reader = new FileReader();
                reader.onload = () => {
                    if (reader.result) {
                        newImages.push(reader.result.toString());
                        if (newImages.length === files.length) {
                            setImages([...images, ...newImages]);
                        }
                    }
                }
                reader.readAsDataURL(files[i]);
            }
        }
        console.log(newImages);
    }

    const handleDragStart = (index: number) => (event : React.DragEvent<HTMLDivElement>) => {
        event.dataTransfer.setData('index', index.toString());
    }

    const handleDrag = (index: number) => (event : React.DragEvent<HTMLDivElement>) => {
        const draggedIndex = Number(event.dataTransfer.getData("index"));
        const newImages = [...images];
        const [draggedImage] = newImages.splice(draggedIndex, 1);
        newImages.splice(index, 0, draggedImage);
        setImages(newImages);
    }

    return (
        <React.Fragment>
            <div
                className="rounded-sm border border-stroke bg-white px-5 pb-2.5 py-4 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
                <div className="border-b">
                    <span className="font-bold text-sm text-black-2 mb-2 block">Thông tin chung</span>
                </div>

                <div className="py-4">
                    <Input label="Tên sản phẩm" feedback="Tên sản phẩm là bắt buộc" placeholder="Nhập tên sản phẩm"
                           type="text" name="name"/>
                    <SearchInput label="Nhà cung cấp" placeholder="Chọn nhà cung cấp"/>
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Giá sản phẩm" feedback="Tên sản phẩm là bắt buộc" placeholder="Nhập giá"
                               type="number" name="price" min={0}/>
                        <Input label="Giá sản phẩm" feedback="Tên sản phẩm là bắt buộc" placeholder="Nhập tên sản phẩm"
                               type="number" name="price"/>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Giá sản phẩm" feedback="Tên sản phẩm là bắt buộc" placeholder="Nhập tên sản phẩm"
                               type="number" name="price" min={0}/>
                        <Select label="Trạng thái" name="status">
                            <option className="py-5" value="">Đang bán</option>
                            <option value="">Hết hàng</option>
                        </Select>
                    </div>

                    <div>
                        <Editor placeholder="Nhập mô tả"/>
                    </div>
                </div>
            </div>

            <div
                className="rounded-sm border border-stroke bg-white mt-5 px-5 pb-5 py-2 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
                <div className="border-b border-opacity-30 ">
                    <span className="text-sm text-black-2 font-bold mb-3 block">Hình ảnh sản phẩm</span>
                </div>
                <div className="border border-dotted rounded mt-5 py-5">
                    <div className="flex flex-col items-center">
                        <input type="file" ref={inputProductImage} className="hidden" accept="image/*"
                               onChange={handleImageChange} multiple={true}/>

                        <div className="flex gap-2">
                            {
                                images.map((image: string, index: number) => (
                                    <div
                                        key={index} className="border relative rounded aspect-square cursor-move"
                                        onDragStart={handleDragStart(index)}
                                        onDragOver={(event: React.DragEvent<HTMLDivElement>) => event.preventDefault()}
                                        onDrag={handleDrag(index)}
                                        draggable
                                    >
                                        <Image src={image} alt={`Product ${index + 1}`} className="object-cover"
                                               width={200} height={200} onClick={() => setPreviewIndex(index)}/>
                                        <div
                                            className="absolute inset-0 flex flex-row justify-center items-center opacity-0 hover:bg-[#31373dbf] hover:opacity-100 transition-opacity">
                                            <button onClick={() => setPreviewIndex(index)} className="px-4 py-2 m-1">
                                                <Eye className="text-white"/>
                                            </button>
                                            <button className="px-4 py-2 m-1">
                                                <Trash className="text-white"/>
                                            </button>
                                        </div>
                                    </div>
                                ))
                            }

                            {previewIndex !== null && (
                                <div
                                    className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-999999">
                                    <div className="max-w-lg max-h-96 overflow-hidden">
                                        <Image src={images[previewIndex]} alt={`Preview ${previewIndex + 1}`}
                                               width={600} height={600}/>
                                        <button className="absolute top-2 right-2 text-white"
                                                onClick={() => setPreviewIndex(null)}>
                                            Close
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                        <ImageUp/>
                        <span className="text-blue-700 font-bold text-sm py-2 cursor-pointer" onClick={openInputImage}>Thêm ảnh</span>
                        <span className="text-blue-700 font-bold text-xs cursor-pointer">Thêm  từ URL <span
                            className="text-body">(Hình ảnh/Video)</span></span>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default ProductForm;
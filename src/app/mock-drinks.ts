import { DrinkModel } from "./models";

export const DRINKS: DrinkModel[] = [
    {
        id: 1,
        name: 'Trà sữa trân châu đường đen',
        description: 'Trà sữa thơm ngon với trân châu dai dai, béo ngậy',
        giaCoBan: 40000,
        imgUrl: 'https://images.unsplash.com/photo-1558857563-b371033873b8?w=600',
        isFavorite: false,
        topping: [
            {
                name: 'Trân châu',quantity: 1,unit: 'gói'
            },
            {
                name: 'Thạch rau câu',quantity: 1, unit: 'gói'
            },
            {
                name: 'Trân châu trắng',quantity: 1,unit: 'gói'
            },
        ]
    },
    {
        id: 2,
        name: 'Trà sữa Matcha',
        description: 'Trà sữa thơm ngon với được pha với matcha nguyên chất',
        giaCoBan: 70000,
        imgUrl: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=600',
        isFavorite: true,
        topping: [
            {
                name: 'Trân châu socola',quantity: 1,unit: 'gói'
            },
            {
                name: 'Trân châu trắng',quantity: 1,unit: 'gói'
            },
        ]
    },
    {
        id: 3,
        name: 'Hồng trà sữa',
        description: 'Trà sữa thơm ngon với được pha bằng hồng trà Hồng Kong thơm ngon và béo ngậy',
        giaCoBan: 30000,
        imgUrl: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=600',
        isFavorite: false,
        topping: [
           
            {
                name: 'Trân châu socola',quantity: 1,unit: 'gói'
            },
            {
                name: 'Trân châu trắng',quantity: 1,unit: 'gói'
            },
        ]
    },
]

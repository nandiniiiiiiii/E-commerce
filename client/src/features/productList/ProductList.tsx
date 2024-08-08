import { useEffect, useState } from 'react'
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllProducts, fetchAllProductsAsync, fetchProductsByFiltersAsync, selectTotalProducts } from './productSlice'
import { ITEMS_PER_PAGE } from '../../app/constants'

function ProductList() {
    const dispatch = useDispatch();
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const products = useSelector(selectAllProducts)
    const totalItems = useSelector(selectTotalProducts)
    console.log(totalItems)
    const [filter, setFilter] = useState({})
    const [sort, setSort] = useState({});
    const [page, setPage] = useState(1);
    // const products = [
    //     {
    //         "id": 1,
    //         "title": "Essence Mascara Lash Princess",
    //         "description": "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
    //         "category": "beauty",
    //         "price": 9.99,
    //         "discountPercentage": 7.17,
    //         "rating": 4.94,
    //         "stock": 5,
    //         "tags": [
    //             "beauty",
    //             "mascara"
    //         ],
    //         "brand": "Essence",
    //         "sku": "RCH45Q1A",
    //         "weight": 2,
    //         "dimensions": {
    //             "width": 23.17,
    //             "height": 14.43,
    //             "depth": 28.01
    //         },
    //         "warrantyInformation": "1 month warranty",
    //         "shippingInformation": "Ships in 1 month",
    //         "availabilityStatus": "Low Stock",
    //         "reviews": [
    //             {
    //                 "rating": 2,
    //                 "comment": "Very unhappy with my purchase!",
    //                 "date": "2024-05-23T08:56:21.618Z",
    //                 "reviewerName": "John Doe",
    //                 "reviewerEmail": "john.doe@x.dummyjson.com"
    //             },
    //             {
    //                 "rating": 2,
    //                 "comment": "Not as described!",
    //                 "date": "2024-05-23T08:56:21.618Z",
    //                 "reviewerName": "Nolan Gonzalez",
    //                 "reviewerEmail": "nolan.gonzalez@x.dummyjson.com"
    //             },
    //             {
    //                 "rating": 5,
    //                 "comment": "Very satisfied!",
    //                 "date": "2024-05-23T08:56:21.618Z",
    //                 "reviewerName": "Scarlett Wright",
    //                 "reviewerEmail": "scarlett.wright@x.dummyjson.com"
    //             }
    //         ],
    //         "returnPolicy": "30 days return policy",
    //         "minimumOrderQuantity": 24,
    //         "meta": {
    //             "createdAt": "2024-05-23T08:56:21.618Z",
    //             "updatedAt": "2024-05-23T08:56:21.618Z",
    //             "barcode": "9164035109868",
    //             "qrCode": "https://assets.dummyjson.com/public/qr-code.png"
    //         },
    //         "images": [
    //             "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png"
    //         ],
    //         "thumbnail": "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png"
    //     }]

    const handleFilter = (e: any, section: any, option: any) => {
        const newfilter = { ...filter }
        if (e.target.checked) {
            if (newfilter[section.id]) {
                newfilter[section.id].push(option.value)
            } else {
                newfilter[section.id] = [option.value]
            }
        } else {
            //delete the unchecked box from the checked array
            const index = newfilter[section.id].findIndex(
                (el) => el === option.value
            );
            newfilter[section.id].splice(index, 1);
        }
        console.log({ newfilter });
        setFilter(newfilter)
        console.log(section.id, option.value)
    };

    const handleSort = (e: any, option: any) => {
        const sort = { _sort: option.sort, _order: option.order };
        console.log({ sort })
        setSort(sort)
    };

    const handlePage = (page: any) => {
        console.log({ page });
        setPage(page);
    };

    useEffect(() => {
        console.log("done")
        const pagination = { _page: page, _limit: ITEMS_PER_PAGE }
        dispatch(fetchProductsByFiltersAsync({ filter, sort, pagination }))
    }, [dispatch, filter, sort, page])

    const sortOptions = [
        { name: 'Best Rating', sort: 'rating', order: 'desc', current: false },
        { name: 'Price: Low to High', sort: 'price', order: 'asc', current: false },
        { name: 'Price: High to Low', sort: 'price', order: 'desc', current: false },
    ]
    const filters = [
        {
            id: 'color',
            name: 'Color',
            options: [
                { value: 'white', label: 'White', checked: false },
                { value: 'beige', label: 'Beige', checked: false },
                { value: 'blue', label: 'Blue', checked: true },
                { value: 'brown', label: 'Brown', checked: false },
                { value: 'green', label: 'Green', checked: false },
                { value: 'purple', label: 'Purple', checked: false },
            ],
        },
        {
            id: 'category',
            name: 'Category',
            options: [
                { value: 'smartphones', label: 'smartphones', checked: false },
                { value: 'laptops', label: 'laptops', checked: false },
                { value: 'fragrances', label: 'fragrances', checked: true },
                { value: 'beauty', label: 'beauty', checked: false },
                { value: 'groceries', label: 'groceries', checked: false },
                { value: 'furniture', label: 'furniture', checked: false },
            ],
        },
        // {
        //     id: 'size',
        //     name: 'Size',
        //     options: [
        //         { value: '2l', label: '2L', checked: false },
        //         { value: '6l', label: '6L', checked: false },
        //         { value: '12l', label: '12L', checked: false },
        //         { value: '18l', label: '18L', checked: false },
        //         { value: '20l', label: '20L', checked: false },
        //         { value: '40l', label: '40L', checked: true },
        //     ],
        // },
    ]

    function classNames(...classes: any) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <div className="bg-white">
            <div>
                {/* Mobile filter dialog */}
                <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 lg:hidden">
                    <DialogBackdrop
                        transition
                        className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
                    />

                    <div className="fixed inset-0 z-40 flex">
                        <DialogPanel
                            transition
                            className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
                        >
                            <div className="flex items-center justify-between px-4">
                                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                <button
                                    type="button"
                                    onClick={() => setMobileFiltersOpen(false)}
                                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                >
                                    <span className="sr-only">Close menu</span>
                                    <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                                </button>
                            </div>

                            {/* Filters */}
                            <form className="mt-4 border-t border-gray-200">

                                {filters.map((section) => (
                                    <Disclosure key={section.id} as="div" className="border-t border-gray-200 px-4 py-6">
                                        <h3 className="-mx-2 -my-3 flow-root">
                                            <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                                <span className="font-medium text-gray-900">{section.name}</span>
                                                <span className="ml-6 flex items-center">
                                                    <PlusIcon aria-hidden="true" className="h-5 w-5 group-data-[open]:hidden" />
                                                    <MinusIcon aria-hidden="true" className="h-5 w-5 [.group:not([data-open])_&]:hidden" />
                                                </span>
                                            </DisclosureButton>
                                        </h3>
                                        <DisclosurePanel className="pt-6">
                                            <div className="space-y-6">
                                                {section.options.map((option, optionIdx) => (
                                                    <div key={option.value} className="flex items-center">
                                                        <input
                                                            defaultValue={option.value}
                                                            defaultChecked={option.checked}
                                                            id={`filter-mobile-${section.id}-${optionIdx}`}
                                                            name={`${section.id}[]`}
                                                            type="checkbox"
                                                            onChange={e => { handleFilter(e, section, option) }}
                                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                        />
                                                        <label
                                                            htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                            className="ml-3 min-w-0 flex-1 text-gray-500"
                                                        >
                                                            {option.label}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </DisclosurePanel>
                                    </Disclosure>
                                ))}
                            </form>
                        </DialogPanel>
                    </div>
                </Dialog>

                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-baseline justify-between border-b border-gray-200 pb-4 pt-6">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">All Products</h1>

                        <div className="flex items-center">
                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                    <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                        Sort
                                        <ChevronDownIcon
                                            aria-hidden="true"
                                            className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                        />
                                    </MenuButton>
                                </div>

                                <MenuItems
                                    transition
                                    className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                >
                                    <div className="py-1">
                                        {sortOptions.map((option) => (
                                            <MenuItem key={option.name}>
                                                <p
                                                    onClick={e => (handleSort(e, option))}
                                                    className={classNames(
                                                        option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                                        'block px-4 py-2 text-sm data-[focus]:bg-gray-100',
                                                    )}
                                                >
                                                    {option.name}
                                                </p>
                                            </MenuItem>
                                        ))}
                                    </div>
                                </MenuItems>
                            </Menu>

                            <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                                <span className="sr-only">View grid</span>
                                <Squares2X2Icon aria-hidden="true" className="h-5 w-5" />
                            </button>
                            <button
                                type="button"
                                onClick={() => setMobileFiltersOpen(true)}
                                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                            >
                                <span className="sr-only">Filters</span>
                                <FunnelIcon aria-hidden="true" className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    <section aria-labelledby="products-heading" className="pb-24 pt-6">
                        <h2 id="products-heading" className="sr-only">
                            Products
                        </h2>

                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                            {/* Filters */}
                            <form className="hidden lg:block">

                                {filters.map((section) => (
                                    <Disclosure key={section.id} as="div" className="border-b border-gray-200 py-6">
                                        <h3 className="-my-3 flow-root">
                                            <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                <span className="font-medium text-gray-900">{section.name}</span>
                                                <span className="ml-6 flex items-center">
                                                    <PlusIcon aria-hidden="true" className="h-5 w-5 group-data-[open]:hidden" />
                                                    <MinusIcon aria-hidden="true" className="h-5 w-5 [.group:not([data-open])_&]:hidden" />
                                                </span>
                                            </DisclosureButton>
                                        </h3>
                                        <DisclosurePanel className="pt-6">
                                            <div className="space-y-4">
                                                {section.options.map((option, optionIdx) => (
                                                    <div key={option.value} className="flex items-center">
                                                        <input
                                                            defaultValue={option.value}
                                                            defaultChecked={option.checked}
                                                            id={`filter-${section.id}-${optionIdx}`}
                                                            name={`${section.id}[]`}
                                                            type="checkbox"
                                                            onChange={e => { handleFilter(e, section, option) }}
                                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                        />
                                                        <label htmlFor={`filter-${section.id}-${optionIdx}`} className="ml-3 text-sm text-gray-600">
                                                            {option.label}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </DisclosurePanel>
                                    </Disclosure>
                                ))}
                            </form>

                            {/* Product grid */}
                            <div className="lg:col-span-3">
                                <div className="bg-white">
                                    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">

                                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                                            {products.map((product: any) => ( 
                                                <Link to={`/productdetails/${product.id}`} key={product.id} >
                                                    <div className="group relative">
                                                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                                            <img
                                                                alt={product.imageAlt}
                                                                src={product.images[0]}
                                                                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                                            />
                                                        </div>
                                                        <div className="mt-4 flex justify-between">
                                                            <div>
                                                                <h3 className="text-sm text-gray-700">
                                                                    <a href={product.href}>
                                                                        <span aria-hidden="true" className="absolute inset-0" />
                                                                        {product.title}
                                                                    </a>
                                                                </h3>
                                                                <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                                                            </div>
                                                            <p className="text-sm font-medium text-gray-900">{product.price}</p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* product grid end */}

                    {/* pagination */}
                    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                        <div className="flex flex-1 justify-between sm:hidden">
                            <a
                                href="#"
                                className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                Previous
                            </a>
                            <a
                                href="#"
                                className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                Next
                            </a>
                        </div>
                        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700">
                                    Showing <span className="font-medium">{(page-1)*ITEMS_PER_PAGE+1}</span> to <span className="font-medium">{page*ITEMS_PER_PAGE}</span> of{' '}
                                    <span className="font-medium">{totalItems}</span> results
                                </p>
                            </div>
                            <div>
                                <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                                    <a
                                        href="#"
                                        className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                    >
                                        <span className="sr-only">Previous</span>
                                        <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
                                    </a>
                                    {Array.from({ length: Math.ceil(totalItems/ITEMS_PER_PAGE)}).map((el, index) => (
                                        <div
                                            key={index}
                                            onClick={(e) => handlePage( index + 1)}
                                            aria-current="page"
                                            className={`relative cursor-pointer z-10 inline-flex items-center ${index + 1 === page
                                                    ? 'bg-indigo-600 text-white'
                                                    : 'text-gray-400'
                                                } px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                                        >
                                            {index + 1}
                                        </div>
                                    ))}
                                    <a
                                        href="#"
                                        className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                    >
                                        <span className="sr-only">Next</span>
                                        <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
                                    </a>
                                </nav>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>

    )
}

export default ProductList

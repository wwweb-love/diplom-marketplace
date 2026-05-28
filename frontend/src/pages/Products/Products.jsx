// package
import styled from "styled-components"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
// components
import { Search, SectionSorted, SectionCategory, ProductCard, Pagination, Loader } from "../../components"
// actions
import { actionCountProducts, actionGlobalError, actionProducts } from "../../actions"
//selectors
import { selectorCountProducts, selectorPage, selectorPageLimit, selectorProducts, selectorSelectedCategory, selectorSelectedSort, selectorTextSearch } from "../../selectors"
// api
import { getProducts } from "../../api"

const ProductsContainer = ({ className }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const products = useSelector(selectorProducts)
    const countProducts = useSelector(selectorCountProducts)
    const textSearch = useSelector(selectorTextSearch)
    const selectedCategory = useSelector(selectorSelectedCategory)
    const selectedSort = useSelector(selectorSelectedSort)
    const page = useSelector(selectorPage)
    const pageLimit = useSelector(selectorPageLimit)

    const [isLoadedProducts, setIsLoadedProducts] = useState(false)

    useEffect(() => {
        setIsLoadedProducts(true)
        getProducts(textSearch, selectedCategory, selectedSort, page, pageLimit)
            .then(loaded => {
                const { error, data } = loaded
                if (error) {
                    dispatch(actionGlobalError(error))
                    navigate("/errors")
                }
                dispatch(actionProducts(data.products))
                dispatch(actionCountProducts(data.count))
            })
            .finally(() => setIsLoadedProducts(false))
    }, [textSearch, selectedCategory, selectedSort, page, pageLimit])

    return (
        <div className={className}>
            <Search />
            <h2>Найдено {countProducts} товаров</h2>
            <div className="block-category-products">
                <SectionCategory />
                <div className="block-sorted-products">
                    <SectionSorted />
                    {isLoadedProducts ? <Loader /> :
                        countProducts ? <>
                            <div className="block-products">
                                {products.map(product => <ProductCard key={product.id} product={product} />)}
                            </div>
                        </> : <h2>Товаров не найдено</h2>}

                </div>
            </div>

            {!isLoadedProducts && <Pagination />}
        </div >
    )
}

export const Products = styled(ProductsContainer)`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    position: relative;

    .no-product {
        width: 1066px;
    }

    .block-category-products {
        display: flex;
        justify-content: space-between;
    }

    .block-sorted-products {
        width: 80%;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .block-products {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
`
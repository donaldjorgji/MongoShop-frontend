import React, { useContext, useState, useEffect, useRef } from 'react'
import './CSS/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext'
import dropdown_icon from '../Commponents/Assets/dropdown_icon.png'
import Item from '../Commponents/Item/Item'

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);

  const [visibleCount, setVisibleCount] = useState(6);
  const [sortOrder, setSortOrder] = useState('az');
  const [openSort, setOpenSort] = useState(false);

  const sortRef = useRef();
  const scrollRef = useRef(0);

  // Reset on category change
  useEffect(() => {
    setVisibleCount(6);
    setSortOrder('az');
  }, [props.category]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setOpenSort(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredProducts = all_product.filter(
    item => props.category === item.category
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === 'az') {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  const visibleProducts = sortedProducts.slice(0, visibleCount);

  const handleLoadMore = () => {
    scrollRef.current = window.scrollY;
    setVisibleCount(prev => prev + 6);

    setTimeout(() => {
      window.scrollTo(0, scrollRef.current);
    }, 0);
  };

  const handleSortChange = (order) => {
    scrollRef.current = window.scrollY;

    setSortOrder(order);
    setOpenSort(false);

    setTimeout(() => {
      window.scrollTo(0, scrollRef.current);
    }, 0);
  };

  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={props.banner} alt="" />

      <div className="shopcategory-indexSort">
        <p>
          <span>
            Shfaq 1-{Math.min(visibleCount, filteredProducts.length)}
          </span> nga {filteredProducts.length} produkte
        </p>

        {/* SORT */}
        <div className="shopcategory-sort" ref={sortRef}>
          
          <div
            className="sort-header"
            onMouseDown={(e) => {
              e.preventDefault(); // ❗ ndalon scroll/focus jump
            }}
            onClick={(e) => {
              e.stopPropagation();
              setOpenSort(prev => !prev);
            }}
          >
            Rendit sipas <img src={dropdown_icon} alt="" />
          </div>

          {openSort && (
            <div className="sort-dropdown">
              <div onClick={() => handleSortChange('az')}>
                A - Z
              </div>
              <div onClick={() => handleSortChange('za')}>
                Z - A
              </div>
            </div>
          )}
        </div>
      </div>

      {/* PRODUCTS */}
      <div className="shopcategory-products">
        {visibleProducts.map((item) => (
          <Item 
            key={item.id}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>

      {/* LOAD MORE */}
      {visibleCount < filteredProducts.length && (
        <div 
          className="shopcategory-meshume" 
          onClick={handleLoadMore}
        >
          Shiko me shume
        </div>
      )}
    </div>
  )
}

export default ShopCategory
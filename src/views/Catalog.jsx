import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { getRealPrice, getSpace, some, stars, updateOne } from "../store/index";
import * as img from "../img/index";
import "../css/Catalog.css";
import { useCallback } from "react";
import useGetAP from "../hooks/getAllProducts";
import config from "../api/config";
import FavoritesUpdate from "../components/ButtonsForUpdate/FavoritesUpdate";
import CompareUpdate from "../components/ButtonsForUpdate/CompareUpdate";
import CardUpdate from "../components/ButtonsForUpdate/CardUpdate";
import ProductImage from "../components/ProductImage/ProductImage";
import Polzunok from "../components/Polzunok/Polzunok";
import Pagination from "../components/Pagination/Pagination";
import useGetFCh from "../hooks/getFCh";

function Catalog() {
  const [params, setParams] = useSearchParams();

  const [page, setPage] = useState(
    Number(params.has("index") ? params.get("index") : 1)
  );

  const [min, setMin] = useState(0);

  const [max, setMax] = useState(0);

  const [can, setCan] = useState(false);

  const [filter, setFilter] = useState({
    prices: {
      min: null,
      max: null,
    }
  });

  const [filtersChecks, loadingF] = useGetFCh();

  const [{ data: products, allength }, loading] = useGetAP(page, 12, filter);

  useEffect(() => {
    setMin(filtersChecks.price ? filtersChecks.price.min : 0);
    setMax(filtersChecks.price ? filtersChecks.price.max : 0);
  }, [filtersChecks]);

  const [openIndex, setOpenIndex] = useState({
    price: false,
    podsvetka: false,
    moshnost: false,
    maksSpeed: false,
  });

  useEffect(() => {
    if (min & max) {
      setFilter({ ...filter, prices: { min, max } });
    }
  }, [can]);

  const filters = loadingF
    ? []
    : [
        {
          key: "price",
          title: "Цена, ₽",
          content: (
            <div className={`dropContent`}>
              <Polzunok
                prices={filtersChecks.price}
                step={10}
                min={[min, setMin]}
                max={[max, setMax]}
              />
              <button className="change" onClick={() => setCan(!can)}>
                Применить
              </button>
            </div>
          ),
        },
        ...Object.entries(filtersChecks)
          .map(([key, item]) => {
            if (item.type === 0) {
              return {
                key: key,
                title: item.title,
                get content() {
                  return (
                    <div className={`dropInputCheck`} style={{
                      height: 28 * item.values.length
                    }}>
                      {item.values.map((item, i) => (
                        <div className="checkbox" key={item}>
                          <input
                            className="custom-checkbox"
                            onChange={(e) =>
                              setFilter({
                                ...filter,
                                [key]: e.target.checked ? e.target.value : null,
                              })
                            }
                            checked={filter[key] == item}
                            type="checkbox"
                            id={`color-${item}`}
                            value={item}
                          />
                          <label htmlFor={`color-${item}`}>{item}</label>
                        </div>
                      ))}
                    </div>
                  );
                },
              };
            } else if (item.type === 1) {
              return {
                key: key,
                title: item.title,
                get content() {
                  return (
                    <div className={`dropInputCheck`} style={{
                      height: 28 * item.values.length
                    }}>
                      {item.values
                        .sort((a, b) => a - b)
                        .map((item, i) => (
                          <div className="checkbox" key={item}>
                            <input
                              className="custom-checkbox"
                              type="checkbox"
                              onChange={(e) => {
                                if (e.target.checked) {
                                  if (filter[key]) {
                                    return setFilter({
                                      ...filter,
                                      [key]: [
                                        ...filter[key],
                                        [i] = e.target.value,
                                      ],
                                    });
                                  }
                                  setFilter({
                                    ...filter,
                                    [key]: [[i] = e.target.value],
                                  });
                                } else {
                                  setFilter({
                                    ...filter,
                                    [key]: filter[key].filter(
                                      (items) => item != items
                                    ),
                                  });
                                }
                              }}
                              id={`color-${item}`}
                              checked={
                                filter[key] &&
                                filter[key].includes(String(item))
                              }
                              value={item}
                            />
                            <label htmlFor={`color-${item}`}>{item}</label>
                          </div>
                        ))}
                    </div>
                  );
                },
              };
            }
            return undefined
          })
          .filter((item) => item),
    ];

  return (
    <div className="catalog">
      <div className="window">
        <h1>Каталог</h1>
        {(loading || loadingF) && "assafsaafsfas"}
        <div style={{display: (loading || loadingF) && 'none'}} className="catalogContent">
          <div className="filter">
            {filters.map((item, index) => (
              <div
                className={`drop ${openIndex[item.key] ? "anim" : ""}`}
                key={index}
              >
                <button
                  onClick={() =>
                    setOpenIndex({
                      ...openIndex,
                      [item.key]: !openIndex[item.key],
                    })
                  }
                  className={openIndex[item.key] ? "" : "droper"}
                >
                  {item.title}
                </button>
                {item.content}
              </div>
            ))}
          </div>
          <div>
            <div className="filters">
              {
                loadingF || Object.entries(filtersChecks).map(([key, value], index) => {
                  if (value.type === 0) {
                    return filter[key] && <p>
                      {value.title}: {filter[key]}
                      <img
                        src={img.x}
                        className="deleteBut"
                        onClick={() => setFilter({ ...filter, [key]: null })}
                      />
                    </p>
                  } else if (value.type === 1) {
                    console.log(filter[key]);
                    return filter[key] ?
                      filter[key].length != 1 ? 
                      <p>
                        {value.title} от 
                        {filter[key].sort((a, b) => a - b)[0]} до 
                        {filter[key].sort((a, b) => b - a)[0]}
                        <img
                          src={img.x}
                          className="deleteBut"
                          onClick={() => setFilter({ ...filter, [key]: null })}
                        />
                      </p>
                      : 
                      <p>
                        {value.title}: {filter[key][0]}
                        <img
                          src={img.x}
                          className="deleteBut"
                          onClick={() => setFilter({ ...filter, [key]: null })}
                        />
                        </p>
                      : null
                  }
                  return undefined
                }).filter(item => item)
              }
              {filter.prices.min && filter.prices.max ? (
                <p>
                  Цена: от {filter.prices.min} ₽ до {filter.prices.max} ₽
                  <img
                    src={img.x}
                    className="deleteBut"
                    onClick={() =>
                      setFilter({
                        ...filter,
                        prices: { min: null, max: null },
                      })
                    }
                  />
                </p>
              ) : null}
              {!Object.values(filter).every(
                (item) => typeof item == "object"
              ) ? (
                <button
                  className="clear"
                  onClick={() => {
                    let obj = {};
                    Object.keys(filter).forEach((iteme) => {
                      obj[iteme] = null;
                      obj["prices"] = { min: min, max: max };
                    });
                    setFilter(obj);
                  }}
                >
                  Очистить фильтры
                </button>
              ) : null}
            </div>
            <div className="xityProdajContent">
              {products.map((item) => (
                <div className="xityProdajBox mb-15" key={item._id}>
                  <ProductImage id={item._id} srcs={item.product} />
                  {item.protection ? (
                    <img
                      src={config.baseUrl + "/images/aqua.png"}
                      className="aqua"
                    />
                  ) : null}
                  <div className="notific">
                    {item.news && <p className="novelty">Новинка</p>}
                    {item.hit && <p className="xit">Хит продаж</p>}
                  </div>
                  <div className="xityProdajTexti">
                    <h5>{item.specification.productName}</h5>
                    <h3>{item.productName}</h3>
                  </div>
                  <div className="rateStar">
                    <div className="ratesStars">{stars(item.rates)}</div>
                    <div className="comments">
                      <img src={img.messageSquare} />
                      <h5>({item.comments.length})</h5>
                    </div>
                  </div>
                  <div className="prices">
                    <div className="pricesText">
                      <del className={`${!item.sale ? "visible" : ""}`}>
                        {item.price} ₽
                      </del>
                      <h3>{item.realPrice} ₽</h3>
                      <h4>
                        <span className="spanone">{item.sale} %</span>{" "}
                        <span className="spantwo">— {item.space} ₽</span>
                      </h4>
                    </div>
                    <div className="statslike">
                      <FavoritesUpdate id={item._id} />
                      <CompareUpdate id={item._id} />
                    </div>
                  </div>
                  <CardUpdate id={item._id} />
                </div>
              ))}
            </div>
            <Pagination length={allength} setPage={setPage} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Catalog;

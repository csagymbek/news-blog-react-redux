import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInput, setBlogData } from "../features/userSlice";
import "../styles/Blogs.css";

export const Blogs = () => {
  const searchInput = useSelector(selectUserInput);
  const dispatch = useDispatch();
  const blogUrl = `https://gnews.io/api/v4/search?q=${searchInput}&lang=en&token=6f2dca2930681901fab71a634b11337d`;
  const [blogs, setBlogs] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(blogUrl)
      .then((res) => res.json())
      .then((data) => {
        dispatch(setBlogData(data));
        setBlogs(data);
        setLoading(!loading);
      })
      .catch((er) => console.log(er.message));
  }, [searchInput]);

  return (
    <div className="blog__page">
      {/* <h1 className="blog__page__header">Blogs</h1> */}
      {loading && <h1>Loading...</h1>}
      <div className="blogs">
        {blogs?.articles?.map(
          ({
            title,
            content,
            image,
            url,
            source,
            publishedAt,
            description,
          }) => (
            <a href={url} target="_blank" className="blog">
              <img src={image} />
              <div className="">
                <h3 className="sourceName">
                  <span>{source.name}</span>
                  <p>{moment(publishedAt).calendar()}</p>
                </h3>
                <h1>{title}</h1>
                <p>{description}</p>
              </div>
            </a>
          )
        )}
        {blogs?.totalArticles === 0 && (
          <h1 className="no__blogs">
            No articles found. Search something else to read blogs on the
            greatest platform.
          </h1>
        )}
      </div>
    </div>
  );
};

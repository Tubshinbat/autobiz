import Section from "components/generals/section";
import { useNewNews } from "hooks/use-news";
import base from "lib/base";
import ReactTimeAgo from "react-time-ago";
import Link from "next/link";

export default () => {
  const { news } = useNewNews(`status=true&limit=3`);

  return (
    <Section>
      <div className="container">
        <div className="section-title">
          <h2> Нийтлэл зөвлөгөө </h2>
        </div>
        <div className="row newsHomeList">
          {news &&
            news.map((el, index) => (
              <div
                className="col-lg-4 col-md-4 col-sm-12 col-12  wow animate__animated animate__fadeInDown"
                data-wow-delay={`${0.2 * index}s`}
                key={el._id}
              >
                <Link href={`/post/${el.slug}`}>
                  <div className="homeNewsItem">
                    <div className="homeNewsPicture">
                      {el.pictures && (
                        <img src={`${base.cdnUrl}/${el.pictures[0]}`} />
                      )}
                    </div>
                    <div className="homeNewsMore">
                      <h4 className="HomeNewsTitle"> {el.name}</h4>
                      <div className="HomeDescription">
                        <div className="HomeNews_date">
                          <div className={`HomeNews__date_item`}>
                            <i class="fa-regular fa-clock"></i>
                            <ReactTimeAgo date={el.createAt} locale="mn-MN" />
                          </div>
                          <div className={`HomeNews__date_item`}>
                            <i class="fa fa-bolt"></i> {el.views} үзсэн
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </Section>
  );
};

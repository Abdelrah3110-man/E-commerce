import Skeleton from "react-loading-skeleton";

export default function SkeletonShow(props) {
  const skeletonLength = Array.from({ length: props.length }).map((_, key) => (
    <div className={props.classes}>
      <div className="mx-1">
        <Skeleton
          height={props.height}
          baseColor={props.baseColor}
          width={props.width}
        ></Skeleton>
      </div>
    </div>
  ));
  return skeletonLength;
}

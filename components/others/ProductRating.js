import { Divider, Rating, Typography, Stack } from "@mui/material";

function ProductRating({ ratings, sold, simple }) {
  return (
    <div className="py-2 flex items-center justify-between ">
      <Stack direction="row" alignItems="center" spacing={1}>
        <Rating
          value={ratings}
          max={1}
          precision={0.5}
          readOnly
          size={!simple ? "medium" : "small"}
        />
        {simple && <small className="ml-1">({ratings})</small>}
        {!simple && <Divider orientation="vertical" flexItem />}
        {!simple && (
          <Typography variant="body2" noWrap>
            {ratings} rating
          </Typography>
        )}
        {!simple && <Divider orientation="vertical" flexItem />}
        {!simple && (
          <Typography variant="body2" noWrap>
            {sold} sold
          </Typography>
        )}
      </Stack>
      {!simple && <div></div>}
    </div>
  );
}

export default ProductRating;

import React, { useMemo, useCallback, useEffect } from "react";
import { AreaClosed, LinePath, Line, Bar } from "@vx/shape";
import appleStock, { AppleStock } from "@vx/mock-data/lib/mocks/appleStock";
import { curveMonotoneX } from "@vx/curve";
import { GridRows, GridColumns } from "@vx/grid";
import { scaleTime, scaleLinear } from "@vx/scale";
import {
  withTooltip,
  Tooltip,
  defaultStyles,
  TooltipWithBounds,
} from "@vx/tooltip";
import { WithTooltipProvidedProps } from "@vx/tooltip/lib/enhancers/withTooltip";
import { localPoint } from "@vx/event";
import { LinearGradient } from "@vx/gradient";
import { max, extent, bisector, min } from "d3-array";
import { timeFormat } from "d3-time-format";
import { blackColor, greenColor, redColor } from "../../constants/Colors";
import { RateResponse } from "../../types/rate";
import { View } from "react-native";
import { PoppinsBoldText } from "../StyledText";
import { red } from "react-native-reanimated/lib/typescript/reanimated2/Colors";

type BTCStock = {
  date: string;
  close: number;
};

type TooltipData = BTCStock;

// const stock = appleStock.slice(800);
export const background = "#3b6978";
export const background2 = "#204051";
export const accentColor = "#edffea";
export const accentColorDark = "#75daad";
const tooltipStyles = {
  ...defaultStyles,
  background,
  border: "1px solid white",
  color: "white",
};

// util
const formatDate = timeFormat("%b %d, '%y");

// accessors
const getDate = (d: BTCStock) => new Date(d.date);
const getStockValue = (d: BTCStock) => d.close;
const bisectDate = bisector<BTCStock, Date>((d) => new Date(d.date)).left;

export type AreaProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  rateResponse?: RateResponse;
};

export default withTooltip<AreaProps, TooltipData>(
  ({
    width,
    height,
    margin = { top: 0, right: 0, bottom: 0, left: 0 },
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipTop = 0,
    tooltipLeft = 0,
    rateResponse,
  }: AreaProps & WithTooltipProvidedProps<TooltipData>) => {
    if (width < 10) return null;
    const date = new Date();
    // console.log("appleStock", appleStock);
    const utcDate = new Date(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds()
    );
    // console.log("utcTime", utcDate);

    const stock = rateResponse?.cryptoRatesSub.map((item) => {
      return {
        date: item.createdAt,
        close: item.cryptos.btc,
      } as BTCStock;
    });

    if (!stock) return null;

    // bounds
    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    const extraTime = new Date(extent(stock, getDate)[1]!);
    const extraValue = extraTime.setTime(extraTime.getTime() + 1 * 5500);
    // scales
    const dateScale = useMemo(
      () =>
        scaleTime({
          range: [0, xMax],
          domain: [extent(stock, getDate)[0], new Date(extraValue)] as [
            Date,
            Date
          ],
        }),
      [xMax, stock]
    );
    const stockValueScale = useMemo(
      () =>
        scaleLinear({
          range: [yMax, 0],
          domain: [
            (min(stock, getStockValue) || 0) - yMax / 50,
            (max(stock, getStockValue) || 0) + yMax / 50,
          ],
          nice: true,
        }),
      [yMax, stock]
    );

    // tooltip handler
    const handleTooltip = useCallback(() => {
      // const { x } = localPoint(event) || { x: 0 };
      // const x0 = dateScale.invert(x);
      // const index = bisectDate(stock, x0, 1);
      const d0 = stock[stock.length - 1];
      // const d1 = stock[index];
      // let d = d0;
      // if (d1 && getDate(d1)) {
      //   d =
      //     x0.valueOf() - getDate(d0).valueOf() >
      //     getDate(d1).valueOf() - x0.valueOf()
      //       ? d1
      //       : d0;
      // }
      showTooltip({
        tooltipData: d0,
        tooltipLeft: xMax - 160,
        tooltipTop: stockValueScale(getStockValue(d0)),
      });
    }, [showTooltip, stockValueScale]);

    //TODO: Fix Maximum update depth exceeded, this Useeffect is causing the error
    useEffect(() => {
      handleTooltip();
    }, [stockValueScale]);

    //TODO: Stop this when the game begins, (The position will be the game starting point)
    const backgroundPosition = tooltipTop;
    return (
      <div>
        <svg width={width} height={height}>
          <rect
            x={0}
            y={0}
            width={width}
            height={yMax}
            fill="url(#area-background-gradient2)"
            // rx={14}
          />
          <LinearGradient
            id="area-background-gradient2"
            from={redColor}
            to={blackColor}
          />
          <rect
            x={0}
            y={0}
            width={width}
            height={backgroundPosition}
            fill="url(#area-background-gradient)"
            opacity={0.7}
          />
          <LinearGradient
            id="area-background-gradient"
            from={"#01ff3c7f"}
            to={"#01ff3cb0"}
            opacity={0.1}
          />
          <LinearGradient
            id="area-gradient"
            from={"#fff"}
            to={"#fff"}
            toOpacity={0.1}
          />
          <GridRows
            scale={stockValueScale}
            width={xMax}
            strokeDasharray="3,3"
            stroke={"#ffffff95"}
            strokeOpacity={0.3}
            pointerEvents="none"
          />
          <GridColumns
            scale={dateScale}
            height={yMax}
            strokeDasharray="3,3"
            stroke={blackColor}
            strokeOpacity={0.3}
            pointerEvents="none"
          />
          <LinePath<BTCStock>
            data={stock}
            xScale={dateScale}
            yScale={stockValueScale}
            // @ts-ignore
            x={(d) => dateScale(getDate(d))}
            // @ts-ignore
            y={(d) => stockValueScale(getStockValue(d))}
            strokeWidth={3}
            stroke="#b4b928"
            strokeLinecap="round"
            fill="transparent"
          />
          <Bar
            x={0}
            y={0}
            width={width}
            height={height}
            fill="transparent"
            rx={14}
            onTouchStart={handleTooltip}
            onTouchMove={handleTooltip}
            onMouseMove={handleTooltip}
            // onMouseLeave={() => hideTooltip()}
          />
          {tooltipData && (
            <g>
              {/* TODO: Make this horizontal line */}
              {/* <Line
                from={{ x: tooltipLeft, y: 0 }}
                to={{ x: tooltipLeft, y: yMax }}
                stroke={"#ffffff7f"}
                strokeWidth={2}
                pointerEvents="none"
                strokeDasharray="5,2"
              /> */}
              <Line
                from={{ x: 0, y: backgroundPosition }}
                to={{ x: xMax, y: backgroundPosition }}
                stroke={"#fff"}
                strokeWidth={2}
                pointerEvents="none"
                strokeDasharray="5,8"
              />

              <circle
                cx={tooltipLeft}
                cy={tooltipTop + 1}
                r={4}
                fill="black"
                fillOpacity={0.1}
                stroke="black"
                strokeOpacity={0.1}
                strokeWidth={2}
                pointerEvents="none"
              />
              <circle
                cx={tooltipLeft}
                cy={tooltipTop}
                r={4}
                fill={blackColor}
                stroke="white"
                strokeWidth={2}
                pointerEvents="none"
              />
            </g>
          )}
        </svg>
        {tooltipData && (
          <div>
            <TooltipWithBounds
              top={tooltipTop}
              left={tooltipLeft}
              style={{
                ...defaultStyles,
                top: -50,
                padding: 0,
                backgroundColor: blackColor,
                borderRadius: 12,
              }}
            >
              <View
                style={{
                  backgroundColor: "#FF9029",
                  padding: 8,
                  borderRadius: 12,
                }}
              >
                <PoppinsBoldText
                  style={{ fontWeight: "900", color: "#fff", fontSize: 20 }}
                >
                  BITCOIN LIVE
                </PoppinsBoldText>
              </View>
              <View style={{ padding: 8 }}>
                <PoppinsBoldText
                  style={{
                    fontWeight: "900",
                    color: greenColor,
                    textAlign: "center",
                    fontSize: 20,
                  }}
                >
                  {`$${getStockValue(tooltipData)}`}
                </PoppinsBoldText>
              </View>
            </TooltipWithBounds>
            {/* <TooltipWithBounds
              top={yMax - 32}
              left={tooltipLeft}
              style={{
                ...defaultStyles,
                minWidth: 72,
                textAlign: "center",
                transform: "translateX(-50%)",
              }}
            >
              {formatDate(getDate(tooltipData))}
            </TooltipWithBounds> */}
          </div>
        )}
      </div>
    );
  }
);

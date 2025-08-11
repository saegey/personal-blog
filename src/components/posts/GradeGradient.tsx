import React from "react";

interface GradeGradientProps {
	data: Array<{
		color: string;
		distance: number;
	}>;
	xMax: number;
}

const GradeGradient = ({ data, xMax }: GradeGradientProps): JSX.Element => {
	const gradients = React.useMemo((): Array<JSX.Element | undefined> => {
		return data.map((d, i): JSX.Element | undefined => {
			if (
				data.length > i + 1 &&
				i > 0 &&
				d.color === data[i - 1].color &&
				d.color === data[i + 1].color
			) {
				return undefined;
			}
			return (
				<stop
					offset={Number((d.distance / xMax).toFixed(10))}
					stopColor={d.color}
					stopOpacity={1}
					key={`elevationGrade-${i}`}
				/>
			);
		});
	}, [data]) as JSX.Element[];

	// if (!gradients) return <></>;

	return <>{gradients}</>;
};

export default GradeGradient;

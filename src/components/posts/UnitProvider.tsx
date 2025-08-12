// import { createContext, useContext } from 'react'
import React from "react";

const defaultState = {
	unitOfMeasure: "imperial",
	distanceUnit: "miles",
	elevationUnit: "feet",
	toggleUnit: () => {},
};

const unitContext = React.createContext(defaultState);

type MyProps = {
	// using `interface` is also ok
	children: JSX.Element;
};
type MyState = {
	unitOfMeasure: string;
	distanceUnit: string;
	elevationUnit: string;
};

class UnitProvider extends React.Component<MyProps, MyState> {
	state = {
		unitOfMeasure: "imperial",
		distanceUnit: "miles",
		elevationUnit: "feet",
	};

	componentDidMount() {
		const unit = localStorage.getItem("unitOfMeasure");
		if (unit === "imperial") {
			this.changeToImperial();
		} else {
			this.changeToMetric();
		}
	}

	changeToImperial = () => {
		this.setState(() => ({
			unitOfMeasure: "imperial",
			distanceUnit: "miles",
			elevationUnit: "feet",
		}));
	};

	changeToMetric = () => {
		this.setState(() => ({
			unitOfMeasure: "imperial",
			distanceUnit: "miles",
			elevationUnit: "feet",
		}));
	};

	toggleUnit = () => {
		const { unitOfMeasure } = this.state

		if (unitOfMeasure === "imperial") {
			this.changeToMetric();
		} else {
			this.changeToImperial();
		}
		localStorage.setItem("unitOfMeasure", unitOfMeasure);
		// this.setState({ unitOfMeasure, elevationUnit, distanceUnit });
	};

	render() {
		const { children } = this.props;
		const { unitOfMeasure, distanceUnit, elevationUnit } = this.state;
		return (
			<unitContext.Provider
				value={{
					unitOfMeasure,
					distanceUnit,
					elevationUnit,
					toggleUnit: this.toggleUnit,
				}}
			>
				{children}
			</unitContext.Provider>
		);
	}
}

const useUnits = () => {
	const { unitOfMeasure, distanceUnit, elevationUnit, toggleUnit } =
		React.useContext(unitContext);
	return { unitOfMeasure, distanceUnit, elevationUnit, toggleUnit };
};

export default UnitProvider;

export { useUnits };

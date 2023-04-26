interface Props {
	title: string;
}

const PageTitle = ({ title }: Props) => {
	return (
		<div
			style={{
				color: '#000',
				height: 39,
				fontWeight: 700,
				fontSize: 32,
				lineHeight: '39px',
				letterSpacing: '-0.408px',
				textTransform: 'capitalize',
				marginTop: '8px',
				padding: '0 24px',
			}}
		>
			{title}
		</div>
	);
};

export default PageTitle;

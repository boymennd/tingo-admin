import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
	MSideBarContainer: {
		// width: 'inherit !important',
		'& .css-12i7wg6-MuiPaper-root-MuiDrawer-paper': {
			color: 'var(--parimary-color)',
			fontWeight: 700,
			marginTop: '72px',
			width: 'inherit !important',
			transition: 'width linear !important',
		},
		'& .MuiListItemIcon-root': {
			color: 'var(--parimary-color)',
			marginRight: '16px',
		},
		'& .MuiButtonBase-root': {
			color: 'var(--parimary-color)',
			padding: '16px 24px',
			borderRadius: '0px 8px 8px 0px',
			width: '200px',
		},
		'& .MuiTypography-root, .MuiListItemButton-root': {
			textTransform: 'capitalize',
			fontSize: '14px',
			fontWeight: 600,
		},
		'& .css-oqgtw4-MuiButtonBase-root-MuiListItemButton-root.Mui-selected,.css-19c054k-MuiButtonBase-root-MuiListItemButton-root.Mui-selected':
			{
				position: 'relative',
				backgroundColor: 'var(--menu-selected-bg-color)',
				'&:before': {
					content: '""',
					position: 'absolute',
					left: 0,
					display: 'block',
					width: '4px',
					height: '56px',
					background: 'var(--bg-gradient-color)',
				},
			},
		'& .css-1ic4du8-MuiListItemText-root': {
			margin: 0,
		},
	},
	MTopBarContainer: {
		background: '#ffffff',
		color: '#34314c',
		position: 'relative',
		height: '72px',
	},
	MTopBarUser: {
		position: 'absolute',
		right: '1rem',
		display: 'flex',
		justifyContent: 'space-around',
		alignItems: 'center',
		gap: '0.1rem',
	},
	MLoginWrapper: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100vh',
	},
	MLoginContainer: {
		width: '100%',
		maxWidth: '1000px !important',
		minHeight: '400px !important',
		margin: '1rem',
		borderRadius: '12px',
		background: '#fff',
		display: 'flex',
		justifyContent: 'space-between',
	},
	MMenuPaperProps: {
		overflow: 'visible',
		filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
		marginTop: 1.5,
		'& .MuiAvatar-root': {
			width: 32,
			height: 32,
			ml: -0.5,
			mr: 1,
		},
		'&:before': {
			content: '""',
			display: 'block',
			position: 'absolute',
			top: 0,
			right: 14,
			width: 10,
			height: 10,
			bgcolor: 'background.paper',
			transform: 'translateY(-50%) rotate(45deg)',
			zIndex: 0,
		},
	},
	MInputLabel: {
		fontSize: '14px',
		marginBottom: '4px',
	},
	MLoginInput: {
		marginBottom: '20px',
		padding: 0,
	},
	MTextField: {
		'& .css-md26zr-MuiInputBase-root-MuiOutlinedInput-root': {
			'& label.Mui-focused': {
				color: 'green',
			},
			'& input': {
				padding: '16px',
				color: 'rgba(20, 20, 20, 0.6)',
			},
		},
		'& .MuiOutlinedInput-root': {
			borderRadius: '12px',
			'& fieldset': {
				border: 'var(--primary-border)',
			},
			'&:hover fieldset': {
				border: 'var(--primary-border)',
			},
			'&.Mui-focused fieldset': {
				border: 'var(--primary-border)',
			},
		},
	},
	MButton: {
		width: '100%',
		height: '56px',
		fontSize: '16px',
		borderRadius: '60px',
		padding: '18px 24px',
		textTransform: 'none',
		backgroundColor: 'var(--primary-color)',
		fontWeight: '700',
		'&:hover': {
			backgroundColor: 'var(--primary-color)',
		},
	},
	MTextValidate: {
		display: 'flex',
		gap: '0.2rem',
		margin: '0 10px !important',
		color: 'red',
		fontSize: 'small',
		fontStyle: 'italic',
	},
	MWarning: {
		width: '16px',
		height: '16px',
		margin: '-2px 5px !important',
		display: 'inline-block',
	},
	MSelect: {
		'& .css-y4ygc1-MuiInputBase-root-MuiOutlinedInput-root': {
			borderRadius: '5px !important',
			// padding: "4px 4px 4px 8px",
		},
		'& .MuiOutlinedInput-root': {
			borderRadius: '5px !important',
		},
		'& .Mui-disabled': {
			background: '#EAEBEB',
		},
	},
	MbtnSearch: {
		borderRadius: '4px !important',
		width: '130px',
		height: '40px',
	},
	MbtnClear: {
		borderRadius: '5px !important',
		color: '#fff',
		width: '130px',
		height: '40px',
		'&:hover': {
			backgroundColor: '#676767',
		},
	},
	MDataGridPaginationTop: {
		'& .MuiDataGrid-columnHeaderTitleContainer': {
			height: '56px',
		},
		'& .MuiDataGrid-columnHeaderTitle': {
			display: '-webkit-box',
			'-webkit-line-clamp': 2,
			'-webkit-box-orient': 'vertical',
			alignItems: 'center',
			color: '#1A2038',
			textAlign: 'center',
			whiteSpace: 'break-spaces !important',
			lineHeight: 'normal',
			fontWeight: '600 !important',
		},
		'& .MuiDataGrid-root': {
			fontFamily: 'Kanit',
			borderRadius: '10px !important',
			overflow: 'hidden',
			display: 'flex !important',
			flexDirection: 'column-reverse',
			'& .MuiDataGrid-columnsContainer': {
				justifyContent: 'center',
			},
			'& .MuiDataGrid-row': {
				maxHeight: 'none !important',
				'& .MuiDataGrid-cell': {
					// padding: '5px',
					overflowWrap: 'anywhere',
					cursor: 'pointer',
					display: 'flex',
					alignItems: 'center',
					lineHeight: '120% !important',
					maxHeight: 'none !important',
					whiteSpace: 'unset !important',
					overflow: 'unset !important',
				},
				'& .MuiDataGrid-cell--textRight': {
					justifyContent: 'flex-end',
				},
				'& .MuiDataGrid-cell--textLeft': {
					justifyContent: 'flex-start',
				},
				'&:last-child': {
					'&.Mui-selected': {
						borderBottomLeftRadius: '8px',
						borderBottomRightRadius: '8px',
					},
				},
			},
			'& .MuiDataGrid-cell:focus-within,& .MuiDataGrid-cell:focus,& .MuiDataGrid-columnHeader:focus-within,& .MuiDataGrid-columnHeader:focus':
				{
					outline: 'none',
				},
		},
		'& .MuiOutlinedInput-root': {
			borderRadius: '5px',
			fontSize: '14px',
		},
		'& .MuiDataGrid-footerContainer': {
			borderBottom: '1px solid #E5E5E5 !important',
			// height: '50px',
		},
		'& .MuiTablePagination-toolbar': {
			color: '#AEAEAE',
			'& .MuiTypography-body2': {
				fontFamily: 'Kanit',
			},
		},

		'& .MuiCheckbox-colorPrimary.Mui-checked': {
			color: '#1A2038',
		},
	},
});

export { useStyles };

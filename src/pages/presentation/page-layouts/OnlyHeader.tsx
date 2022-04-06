import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import { layoutMenu } from '../../../menu';

const OnlyHeader = () => {
	return (
		<PageWrapper title={layoutMenu.pageLayout.subMenu.onlyHeader.text}>
			<Page>
				<div className='row d-flex align-items-center h-100'>
					<div
						className='col-12 d-flex justify-content-center'
						style={{ fontSize: 'calc(3rem + 3vw)' }}>
						<p>
							<span className='text-primary fw-bold me-1'>Only</span> Header
						</p>
					</div>
					<div className='col-12 d-flex align-items-baseline justify-content-center'>
						<img
							srcSet='../../../assets/img/scene2.webp'
							src='../../../assets/img/scene2.png'
							alt='Humans'
							style={{ height: '50vh' }}
						/>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default OnlyHeader;

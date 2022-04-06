import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import { layoutMenu } from '../../../menu';

const OnlyContent = () => {
	return (
		<PageWrapper title={layoutMenu.pageLayout.subMenu.onlyContent.text}>
			<Page>
				<div className='row d-flex align-items-center h-100'>
					<div
						className='col-12 d-flex justify-content-center'
						style={{ fontSize: 'calc(3rem + 3vw)' }}>
						<p>
							Only <span className='text-primary fw-bold ms-1'>Content</span>
						</p>
					</div>
					<div className='col-12 d-flex align-items-baseline justify-content-center'>
						<img
							srcSet='../../../assets/img/scene4.webp'
							src='../../../assets/img/scene4.png'
							alt='Humans'
							style={{ height: '50vh' }}
						/>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default OnlyContent;

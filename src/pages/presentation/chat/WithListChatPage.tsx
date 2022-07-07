import { useState } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../layout/SubHeader/SubHeader';
import Button from '../../../components/bootstrap/Button';
import Page from '../../../layout/Page/Page';
import Card, {
	CardActions,
	CardBody,
	CardFooter,
	CardFooterLeft,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../../components/bootstrap/Card';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Chat, { ChatAvatar, ChatGroup, ChatListItem } from '../../../components/Chat';
import InputGroup from '../../../components/bootstrap/forms/InputGroup';
import Textarea from '../../../components/bootstrap/forms/Textarea';
import USERS from '../../../common/data/userDummyData';
import CHATS from '../../../common/data/chatDummyData';
import CommonChatStatus from '../../common/CommonChatStatus';
import { AccountCircleTwoTone, ChevronLeft, InfoTwoTone, Logout, SendTwoTone } from '@mui/icons-material';
import COLORS from 'common/data/enumColors';
import { pages } from 'menu';

const WithListChatPage = () => {
	const navigate = useNavigate();

	const TABS = [USERS[0], USERS[1], USERS[2], USERS[3], USERS[4], USERS[5]];
	const [activeTab, setActiveTab] = useState<any>(TABS[0]);

	function getMessages(ACTIVE_TAB: any): any {
		if (ACTIVE_TAB === USERS[0]) {
			return CHATS.CHLOE_VS_JOHN;
		}
		if (ACTIVE_TAB === USERS[1]) {
			return CHATS.ELLA_VS_JOHN;
		}
		if (ACTIVE_TAB === USERS[2]) {
			return CHATS.ELLA_VS_JOHN
		}
		if (ACTIVE_TAB === USERS[3]) {
			return CHATS.ELLA_VS_JOHN
		}

		if (ACTIVE_TAB === USERS[4]) {
			return CHATS.ELLA_VS_JOHN
		}
		if (ACTIVE_TAB === USERS[5]) {
			return CHATS.ELLA_VS_JOHN
		}
		return null;
	}

	const [listShow, setListShow] = useState(true);

	const getListShow = (TAB_NAME: any) => {
		setActiveTab(TAB_NAME);
	};

	return (
		<PageWrapper title={pages.chat.text}>
			<SubHeader>
				<SubHeaderLeft>
					<span>
						<InfoTwoTone fontSize='large' className='me-2' htmlColor={COLORS.DANGER.code} />
						<span className='text-muted'>
							You have 14 unread messages.
						</span>
					</span>
				</SubHeaderLeft>
				<SubHeaderRight>
					<CommonChatStatus />
					{!listShow && (
						<Button
							color='info'
							isLight
							icon={ChevronLeft}
							onClick={() => {
								setListShow(true);
							}}>
							Back to List
						</Button>
					)}
				</SubHeaderRight>
			</SubHeader>
			<Page>
				<div className='row h-100'>
					{(listShow) && (
						<div className='col-lg-4 col-md-6'>
							<Card stretch className='overflow-hidden'>
								<CardBody isScrollable className='p-0'>
									<Card shadow='none' className='mb-0'>
										<CardHeader className='sticky-top'>
											<CardLabel icon={AccountCircleTwoTone} iconColor='success'>
												<CardTitle>Online</CardTitle>
												<CardSubTitle>3 users</CardSubTitle>
											</CardLabel>
										</CardHeader>
										<CardBody className='border-bottom border-light'>
											<div className='row'>
												<ChatListItem
													onClick={() => getListShow(TABS[0])}
													isActive={activeTab === TABS[0]}
													src={USERS[0].src}
													srcSet={USERS[0].srcSet}
													name={USERS[0].name}
													surname={USERS[0].surname}
													isOnline={USERS[0].isOnline}
													color={USERS[0].color}
													lastSeenTime={moment()
														.add(-1, 'week')
														.fromNow()}
													latestMessage={
														"I think it's really starting to shine."
													}
												/>
												<ChatListItem
													onClick={() => getListShow(TABS[1])}
													isActive={activeTab === TABS[1]}
													src={USERS[1].src}
													srcSet={USERS[1].srcSet}
													name={USERS[1].name}
													surname={USERS[1].surname}
													isOnline={USERS[1].isOnline}
													color={USERS[1].color}
													unreadMessage={13}
													lastSeenTime={moment()
														.add(-1, 'hour')
														.fromNow()}
													latestMessage='Curabitur ornare mattis urna euismod molestie.'
												/>
												<ChatListItem
													onClick={() => getListShow(TABS[2])}
													isActive={activeTab === TABS[2]}
													src={USERS[2].src}
													srcSet={USERS[2].srcSet}
													name={USERS[2].name}
													surname={USERS[2].surname}
													isOnline={USERS[2].isOnline}
													color={USERS[2].color}
													unreadMessage={1}
													lastSeenTime={moment()
														.add(-3, 'hour')
														.fromNow()}
													latestMessage='Nulla sollicitudin consectetur arcu, sit amet rutrum felis tincidunt non.'
												/>
											</div>
										</CardBody>
									</Card>
									<Card shadow='none' className='mb-0'>
										<CardHeader className='sticky-top'>
											<CardLabel icon={AccountCircleTwoTone} iconColor='danger'>
												<CardTitle>Offline</CardTitle>
												<CardSubTitle>3 users</CardSubTitle>
											</CardLabel>
										</CardHeader>
										<CardBody>
											<div className='row'>
												<ChatListItem
													onClick={() => getListShow(TABS[3])}
													isActive={activeTab === TABS[3]}
													src={USERS[3].src}
													srcSet={USERS[3].srcSet}
													name={USERS[3].name}
													surname={USERS[3].surname}
													isOnline={USERS[3].isOnline}
													color={USERS[3].color}
													lastSeenTime={moment().add(-3, 'day').fromNow()}
													latestMessage='Vivamus fermentum dui sit amet orci interdum pulvinar.'
												/>
												<ChatListItem
													onClick={() => getListShow(TABS[4])}
													isActive={activeTab === TABS[4]}
													src={USERS[4].src}
													srcSet={USERS[4].srcSet}
													name={USERS[4].name}
													surname={USERS[4].surname}
													isOnline={USERS[4].isOnline}
													color={USERS[4].color}
													lastSeenTime={moment().fromNow()}
													latestMessage='Eleifend sagittis!'
												/>
												<ChatListItem
													onClick={() => getListShow(TABS[5])}
													isActive={activeTab === TABS[5]}
													src={USERS[5].src}
													srcSet={USERS[5].srcSet}
													name={USERS[5].name}
													surname={USERS[5].surname}
													isOnline={USERS[5].isOnline}
													color={USERS[5].color}
													lastSeenTime={moment()
														.add(-5, 'week')
														.fromNow()}
													latestMessage='Pellentesque a massa at magna laoreet luctus sed dignissim erat.'
												/>
											</div>
										</CardBody>
									</Card>
								</CardBody>
								<CardFooter>
									<CardFooterLeft className='w-100'>
										<Button
											icon={Logout}
											color='danger'
											isLight
											className='w-100 p-3'
											onClick={() => navigate(`../${pages.login.path}`)}>
											Logout
										</Button>
									</CardFooterLeft>
								</CardFooter>
							</Card>
						</div>
					)}
					{(!listShow) && (
						<div className='col-lg-8 col-md-6'>
							<Card stretch>
								<CardHeader>
									<CardActions>
										<div className='d-flex align-items-center'>
											<ChatAvatar
												// eslint-disable-next-line react/jsx-props-no-spreading
												{...activeTab}
												className='me-3'
											/>
											<div className='fw-bold'>
												{`${activeTab.name} ${activeTab.surname}`}
											</div>
										</div>
									</CardActions>
								</CardHeader>
								<CardBody isScrollable>
									<Chat>
										{getMessages(activeTab).map((msg: any) => (
											<ChatGroup
												messages={msg.messages}
												user={msg.user}
												isReply={msg.isReply}
											/>
										))}
									</Chat>
								</CardBody>
								<CardFooter className='d-block'>
									<InputGroup>
										<Textarea />
										<Button color='info' icon={SendTwoTone}>
											SEND
										</Button>
									</InputGroup>
								</CardFooter>
							</Card>
						</div>
					)}
				</div>
			</Page>
		</PageWrapper>
	);
};

export default WithListChatPage;

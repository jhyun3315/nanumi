import React, {useState, useEffect} from 'react';
import {View, FlatList, StyleSheet, Image, Alert} from 'react-native';
import {ProductPrice, ProductTitle, SubInfo} from './SubInfo';
import {COLORS, SHADOWS, SIZES} from '../../constants';
import {useRecoilState} from 'recoil';
import {RectButton} from '../../ui/Button';
import {BackHeader} from '../../ui/BackHeader';
import GlobalModal from '../modal/GlobalModal';
import {useModal} from '../../hooks/useModal';
import {useInfiniteQuery} from '@tanstack/react-query';
import {Fallback} from '../../ui/Fallback';
import {userState} from './../../state/user';
import {requestGetDonationingProductList} from './../../api/product';
import {requestCreateChatRoom} from './../../api/chat';
import ErrorModal from '../modal/ErrorModal';

const MatchingProductListItem = ({data, navigation}) => {
  const {showModal, hideModal} = useModal();

  const handleCreateChatRoomAndNavigate = async (
    sendUser,
    opponentId,
    opponentNickname,
    opponentProfileImage,
    productId,
  ) => {
    const body = {
      sendUser: sendUser,
      opponentId: opponentId,
      opponentNickname: opponentNickname,
      opponentProfileImage: opponentProfileImage,
      productId: productId,
    };
    try {
      const response = await requestCreateChatRoom(body);

      if (response.productId) {
        hideModal();
        navigation.navigate('BottomTabs', {screen: 'ChatList'});
      }
      if (response.code === 404) {
        hideModal();
        Alert.alert('이미 존재하는 채팅방입니다.');
      }
    } catch (e) {
      Alert.alert('알 수 없는 에러 발생');
    }
  };

  const handleOpenMatchingUserModal = () => {
    showModal({
      modalType: 'MatchingUserModal',
      modalProps: {
        visible: true,
        productId: data?.id,
        onConfirm: handleCreateChatRoomAndNavigate,
      },
    });
  };

  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        borderRadius: SIZES.font,
        marginBottom: SIZES.extraLarge,
        margin: SIZES.base,
        ...SHADOWS.dark,
      }}>
      <View style={styles.imageContainer}>
        <Image
          source={{uri: data?.productImageUrl}}
          resizeMode="contain"
          style={styles.image}
        />
      </View>
      <SubInfo isMatching={true} />
      <View style={styles.textContainer}>
        <ProductTitle title={data?.name} titlSize={SIZES.large} />
        <View style={styles.priceButtonContainer}>
          <ProductPrice />
          <RectButton
            minWidth={64}
            fontSize={SIZES.font}
            handlePress={handleOpenMatchingUserModal}>
            매칭인원
          </RectButton>
        </View>
      </View>
    </View>
  );
};

const MatchingProductList = ({navigation}) => {
  const [user] = useRecoilState(userState);
  const [productList, setProductList] = useState({});

  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery(
    ['dividing'],
    ({pageParam = 0}) =>
      requestGetDonationingProductList(user.userId, pageParam),
    {
      getNextPageParam: (lastPage, pages) => {
        if (
          !lastPage?.result?.content?.length ||
          (pages &&
            pages.length > 0 &&
            pages[pages.length - 1].result &&
            pages[pages.length - 1].result.last)
        ) {
          return undefined;
        }
        return pages ? pages?.length : undefined;
      },
    },
  );

  useEffect(() => {
    setProductList({
      ...productList,
      isFetchingNextPage: isFetchingNextPage,
    });
  }, [isFetchingNextPage]);

  useEffect(() => {
    setProductList({
      ...productList,
      data: data,
      error: error,
      isLoading: isLoading,
      hasNextPage: hasNextPage,
    });
  }, [data, error, isLoading, hasNextPage]);

  const handleLoadMore = () => {
    if (!isLoading && hasNextPage) fetchNextPage();
  };

  const content =
    productList?.data?.pages?.flatMap(page => page.result.content) ?? [];

  if (error) return <ErrorModal handlePress={refetch} />;
  if (isLoading) return <Fallback />;

  return (
    <View style={styles.container}>
      <BackHeader navigation={navigation}>매칭 상품</BackHeader>
      <View style={styles.flatListWrapper}>
        <FlatList
          data={content}
          renderItem={({item}) => (
            <MatchingProductListItem data={item} navigation={navigation} />
          )}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
        />
      </View>
      <GlobalModal />
      <View style={styles.backgroundWrapper}>
        <View style={styles.backgroundTop} />
        <View style={styles.backgroundBottom} />
      </View>
    </View>
  );
};

export default MatchingProductList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListWrapper: {
    zIndex: 0,
    flex: 1,
  },
  contentContainerStyle: {
    paddingBottom: 16,
  },
  backgroundWrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: -1,
  },
  backgroundTop: {
    height: 200,
    backgroundColor: COLORS.white,
  },
  backgroundBottom: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  imageContainer: {
    width: '100%',
    height: 250,
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: SIZES.font,
    borderTopRightRadius: SIZES.font,
  },
  textContainer: {
    width: '100%',
    padding: SIZES.font,
  },
  priceButtonContainer: {
    marginTop: SIZES.font,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

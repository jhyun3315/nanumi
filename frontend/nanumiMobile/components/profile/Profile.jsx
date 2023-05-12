import React, {useCallback} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  Dimensions,
} from 'react-native';
import {COLORS, FONTS, SIZES, SHADOWS, assets} from '../../constants';
import {RectButton} from '../../ui/Button';
import {useModal} from '../../hooks/useModal';
import {useQuery} from '@tanstack/react-query';
import {requestGetProfile} from '../../api/user';
import {useRecoilState} from 'recoil';
import {userState} from './../../state/user';
import {Fallback} from '../../ui/Fallback';
import ErrorModal from '../modal/ErrorModal';
import ProgressBar from './ProgressBar';
import GlobalModal from '../modal/GlobalModal';
const {width} = Dimensions.get('window');

const Profile = ({navigation}) => {
  const {showModal, hideModal} = useModal();
  const [user, setUser] = useRecoilState(userState);

  const handleLogout = async () => {
    hideModal();
    navigation.navigate('Login');
  };

  const {data, error, isLoading, refetch} = useQuery(
    ['profile', user.userId],
    () => requestGetProfile(user.userId),
    {
      enabled: !!user.userId,
    },
  );

  const handleOpenLogoutModal = () => {
    showModal({
      modalType: 'TwoButtonModal',
      modalProps: {
        title: '로그아웃',
        content: '정말 로그아웃 하시겠어요?',
        visible: true,
        onConfirm: handleLogout,
        onCancel: hideModal,
      },
    });
  };

  const handleOpenWithdrawalModal = () => {
    showModal({
      modalType: 'TwoButtonModal',
      modalProps: {
        title: '회원탈퇴',
        content: '정말 탈퇴하시겠어요?',
        visible: true,
        onConfirm: hideModal,
        onCancel: hideModal,
      },
    });
  };

  if (error) return <ErrorModal handlePress={refetch} />;
  if (isLoading) return <Fallback />;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      <ScrollView>
        <GlobalModal />
        <View style={styles.profileContainer}>
          <View style={styles.profileImage}>
            <Image
              source={{uri: data?.result?.profileUrl}}
              style={styles.image}
              resizeMode="contain"
            />
            <View style={styles.tier}>
              <Image
                source={assets.badge}
                style={{width: SIZES.extraLarge, height: SIZES.extraLarge}}
              />
            </View>
          </View>
          <Text style={[styles.text, styles.nickname]}>
            {data?.result?.nickname}
          </Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <RectButton
            minWidth={width / 1.1}
            fontSize={SIZES.font}
            backgroundColor={COLORS.secondary}
            borderRadius={SIZES.base}
            {...SHADOWS.dark}
            handlePress={() => {
              navigation.navigate('ProfileUpdate', {
                nickname: data?.result?.nickname,
                profileUrl: data?.result?.profileUrl,
              });
            }}>
            수정하기
          </RectButton>
        </View>
        <View style={styles.infoContainer}>
          <View
            style={{
              width: width / 1.1,
              alignSelf: 'flex-start',
              marginBottom: SIZES.base,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={styles.smallText}>매너온도</Text>
            <Text style={styles.smallText}>{data?.result?.temperature}°C</Text>
          </View>
          <ProgressBar value={data?.result?.temperature} />
        </View>

        <Pressable
          style={styles.statusContainer}
          onPress={() =>
            navigation.navigate('DivideProduct', {
              type: 'divided',
              userId: user?.userId,
            })
          }>
          <View style={styles.statusBox}>
            <Text style={[styles.text, styles.count]}>
              {data?.result?.giveCount}
            </Text>
            <Text style={[styles.text, styles.subText]}>나눔한 물건</Text>
          </View>

          <Pressable
            onPress={() =>
              navigation.navigate('DivideProduct', {
                type: 'dividing',
                userId: user?.userId,
              })
            }
            style={[
              styles.statusBox,
              {
                borderColor: '#DFD8C8',
                borderLeftWidth: 1,
                borderRightWidth: 1,
              },
            ]}>
            <Text style={[styles.text, styles.count]}>
              {data?.result?.givingCount}
            </Text>
            <Text style={[styles.text, styles.subText]}>나눔중인 물건</Text>
          </Pressable>

          <Pressable
            style={styles.statusBox}
            onPress={() =>
              navigation.navigate('DivideProduct', {
                type: 'received',
                userId: user?.userId,
              })
            }>
            <Text style={[styles.text, styles.count]}>
              {data?.result?.givenCount}
            </Text>
            <Text style={[styles.text, styles.subText]}>나눔받은 물건</Text>
          </Pressable>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('MatchingProduct')}
          style={[
            styles.list,
            {borderTopWidth: 1, borderTopColor: COLORS.lightGray},
          ]}>
          <Text style={styles.text}>매칭목록</Text>
        </Pressable>

        <Pressable
          style={styles.list}
          onPress={() => {
            navigation.navigate('Review');
          }}>
          <Text style={styles.text}>리뷰 목록</Text>
        </Pressable>
        <Pressable
          style={styles.list}
          onPress={() => navigation.navigate('MapUpdate')}>
          <Text style={styles.text}>내 동네 설정</Text>
        </Pressable>
        <Pressable
          style={styles.list}
          onPress={() => navigation.navigate('BlockUser')}>
          <Text style={styles.text}>차단 사용자 관리</Text>
        </Pressable>
        <Pressable style={styles.list} onPress={handleOpenLogoutModal}>
          <Text style={styles.text}>로그아웃</Text>
        </Pressable>
        <Pressable style={styles.list} onPress={handleOpenWithdrawalModal}>
          <Text style={styles.text}>탈퇴하기</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  smallText: {
    fontFamily: FONTS.light,
    fontSize: SIZES.small,
    color: COLORS.primary,
  },
  text: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.font,
    color: COLORS.primary,
  },
  subText: {
    fontSize: SIZES.medium,
    color: COLORS.gray,
    fontFamily: FONTS.light,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.large,
    paddingVertical: SIZES.base * 2,
  },
  profileImage: {
    width: 85,
    height: 85,
    borderRadius: 100,
    marginRight: SIZES.extraLarge,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  tier: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: SIZES.extraLarge,
    height: SIZES.extraLarge,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: SIZES.extraLarge,
  },
  nickname: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.large,
  },
  statusContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: SIZES.extraLarge,
    marginBottom: SIZES.extraLarge,
  },

  statusBox: {
    alignItems: 'center',
    flex: 1,
  },

  count: {
    fontSize: SIZES.large,
  },

  list: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
    padding: SIZES.base * 2,
  },
});

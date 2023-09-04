Kakao.init('3d8901fc212016dd590d66f27cb9d29e');

document.querySelector('.kakao').addEventListener('click', function () {
    // 원하는 동의 항목 설정
    const requestedScope = 'profile_nickname, account_email, gender, age_range';

    // 간단한 UUID 생성 함수
    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
                v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    // 카카오 로그인 요청
    Kakao.Auth.login({
        scope: requestedScope,
        success: function (authObj) {
            // 로그인 성공 시 사용자 정보 가져오기
            Kakao.API.request({
                url: '/v2/user/me',
                success: function (response) {
                    var userId = response.id;
                    var userName = response.properties.nickname;
                    var userNickname = response.properties.nickname;
                    var userAgeRange = response.kakao_account.age_range;
                    var userEmail = response.kakao_account.email;
                    var userGender = response.kakao_account.gender;
                    var userJoinDate = new Date(response.connected_at).toISOString().split('T')[0]; // 연월일 부분 추출

                    // UUID 생성
                    var userUUID = generateUUID();

                    // 로그인 성공 후 객체를 저장 (세션 스토리지 사용)
                    const kakao_user_info = {
                        uuid: userUUID,
                        join: userJoinDate,
                        nickname: userNickname,
                        age: userAgeRange,
                        email: userEmail,
                        gender: userGender,
                        // 여기에 필요한 다른 정보도 추가할 수 있음
                    };

                    // 객체를 JSON 문자열로 변환하여 세션 스토리지에 저장
                    sessionStorage.setItem('kakao_user_info', JSON.stringify(kakao_user_info));
                    window.location.href = "./mypage.html";

                },
                fail: function (error) {
                    // 사용자 정보 가져오기 실패 시 알림 표시
                    alert('사용자 정보 가져오기 실패: ' + error.message);
                }
            });
        },
        fail: function (error) {
            // 로그인 실패 시 알림 표시
            alert('로그인 실패: ' + error.message);
        }
    });
});


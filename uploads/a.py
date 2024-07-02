import cv2

def get_pixel_diff(pxl1, pxl2):
    return sum([abs(pxl1[i] - pxl2[i]) for i in range(3)])

def comapre_pixel_to_pixels_arounds(frame, pixel_position, radios):
    return get_pixel_diff(frame[pixel_position[0], pixel_position[1]], frame[pixel_position[0], pixel_position[1]] + radios) + get_pixel_diff(frame[pixel_position[0], pixel_position[1]], frame[pixel_position[0], pixel_position[1]] - radios) + get_pixel_diff(frame[pixel_position[0], pixel_position[1]], frame[pixel_position[0] + get_pixel_diff(frame[pixel_position[0], pixel_position[1]], frame[pixel_position[0] - radios, pixel_position[1]] ), pixel_position[1]]) + get_pixel_diff(frame[pixel_position[0], pixel_position[1]], frame[pixel_position[0] + radios, pixel_position[1]])

video = cv2.VideoCapture('//home//jonatan//Downloads//a.mp4')
fps = video.get(cv2.CAP_PROP_FPS)
video.set(cv2.CAP_PROP_POS_FRAMES, frame_id)
ret, first_frame = video.read()

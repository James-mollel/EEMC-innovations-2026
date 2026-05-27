import qrcode
from PIL import Image, ImageDraw, ImageFont

def generate_eemc_qr(app_url, output_filename="eemc_competition_qr.png"):
    # 1. Usanidi wa QR Code (Tunatumia Error Correction HIGH ili QR isomeke hata herufi zikikaa katikati)
    qr = qrcode.QRCode(
        version=None, # Inajichagua yenyewe kulingana na urefu wa link
        error_correction=qrcode.constants.ERROR_CORRECT_H, # Ulinzi wa juu (High)
        box_size=15, # Ukubwa wa kila kitalu ndani ya QR
        border=4, # Nafasi ya pembeni ya QR
    )
    
    # Weka link ya App yako ya EEMC UDOM 2026
    qr.add_data(app_url)
    qr.make(fit=True)

    # 2. Tengeneza Picha ya QR (Rangi ya Slate/Navy ya kisasa na background nyeupe)
    qr_img = qr.make_image(fill_color="#0F172A", back_color="white").convert('RGB')
    
    # 3. Maandalizi ya kuweka herufi "EEMC" katikati
    width, height = qr_img.size
    logo_size = int(width * 0.22) # Herufi zitachukua 22% ya ukubwa wa QR Code
    
    # Kutengeneza kibox cheupe cha background katikati
    logo_box = Image.new("RGB", (logo_size, logo_size), "white")
    draw = ImageDraw.Draw(logo_box)
    
    # Jaribu kutafuta font nzuri ya ki-bold, isipopatikana itatumia font ya mfumo
    try:
        # Unaweza kuweka font yoyote ya bold iliyopo kwenye kompyuta yako (e.g., Arial, Helvetica)
        font = ImageFont.truetype("arialbd.ttf", int(logo_size * 0.4))
    except IOError:
        font = ImageFont.load_default()

    # Maandishi ya kuandika
    text = "EEMC"
    
    # Kokotoa nafasi ili herufi zikae katikati kabisa ya kibox cheupe
    # Kwa kutumia bbox kupata vipimo sahihi vya maandishi
    text_bbox = draw.textbbox((0, 0), text, font=font)
    text_width = text_bbox[2] - text_bbox[0]
    text_height = text_bbox[3] - text_bbox[1]
    
    text_x = (logo_size - text_width) // 2
    text_y = (logo_size - text_height) // 2 - (text_height // 4) # Adjust kidogo kwa ajili ya baseline
    
    # Chora maandishi ya Emerald Green au Slate (Hapa tumetumia rangi ya Emerald ya mashindano)
    draw.text((text_x, text_y), text, fill="#059669", font=font)

    # 4. Bandika kibox cha "EEMC" katikati kabisa ya QR Code
    pos_x = (width - logo_size) // 2
    pos_y = (height - logo_size) // 2
    qr_img.paste(logo_box, (pos_x, pos_y))

    # 5. Hifadhi Picha yako safi kabisa
    qr_img.save(output_filename, "PNG")
    print(f"🔥 Unyama umekamilika! QR Code imehifadhiwa kama: {output_filename}")

# --- MATUMIZI ---
# Weka link halisi ya mfumo wako hapa (mfano link ya Vercel, NetPoa, au IP ya chuo)
APP_LINK = "https://eemc-udom.kazibase.co.tz" 
generate_eemc_qr(APP_LINK)